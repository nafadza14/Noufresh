import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || 'https://anurxevfvmwpavcoihdj.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

// Jadwal reminder per tier (hari ke berapa dikirim setelah order)
const REMINDER_SCHEDULE = {
  Trial: [1, 3, 7, 12, 14],
  Starter: [1, 3, 7, 14, 21, 28, 30],
  Complete: [1, 3, 7, 14, 21, 28, 35, 42, 44],
  Pro: [1, 3, 7, 14, 21, 28, 35, 42, 49, 56, 58, 60]
};

function normalizePhone(phone) {
  let p = String(phone).replace(/\D/g, '');
  if (p.startsWith('0')) p = '62' + p.slice(1);
  if (p.startsWith('+62')) p = p.slice(1);
  if (!p.startsWith('62')) p = '62' + p;
  return p;
}

async function sendViaFonnte(target, message) {
  const token = process.env.FONNTE_API_TOKEN;
  if (!token) {
    console.warn('[Fonnte] FONNTE_API_TOKEN tidak diset — skip');
    return { success: false };
  }
  try {
    const res = await fetch('https://api.fonnte.com/send', {
      method: 'POST',
      headers: { 'Authorization': token, 'Content-Type': 'application/json' },
      body: JSON.stringify({ target, message })
    });
    return { success: res.ok, data: await res.json() };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

async function callClaude(prompt) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return null;
  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 512,
        messages: [{ role: 'user', content: prompt }]
      })
    });
    const data = await res.json();
    return data.content?.[0]?.text || null;
  } catch {
    return null;
  }
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  try {
    const { order_code, customer_name, phone: phoneRaw, tier, total, address } = req.body;

    if (!order_code || !customer_name || !phoneRaw || !tier || !total) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const phone = normalizePhone(phoneRaw);
    const schedule = REMINDER_SCHEDULE[tier] || [];
    const orderDate = new Date();

    // 1. Upsert customer
    let customerId = null;
    const { data: existingCustomer } = await supabase
      .from('customers')
      .select('id')
      .eq('phone', phone)
      .single();

    if (existingCustomer) {
      customerId = existingCustomer.id;
      await supabase.from('customers').update({
        name: customer_name,
        tier,
        program_start_date: orderDate.toISOString().slice(0, 10),
        program_end_date: new Date(orderDate.getTime() + schedule[schedule.length - 1] * 86400000).toISOString().slice(0, 10),
        ...(address ? { address } : {})
      }).eq('id', customerId);
    } else {
      const { data: newCustomer } = await supabase.from('customers').insert({
        name: customer_name,
        phone,
        tier,
        program_start_date: orderDate.toISOString().slice(0, 10),
        program_end_date: new Date(orderDate.getTime() + schedule[schedule.length - 1] * 86400000).toISOString().slice(0, 10),
        address: address || null,
        status: 'active'
      }).select('id').single();
      customerId = newCustomer?.id;
    }

    // 2. Simpan order
    await supabase.from('orders').insert({
      order_code,
      customer_id: customerId,
      product_name: `Behel Care ${tier}`,
      tier,
      total,
      address: address || null,
      status: 'pending_confirmation'
    });

    // 3. Generate pesan konfirmasi
    let confirmMsg;
    if (address && address.trim()) {
      const claudePrompt = `Buat pesan konfirmasi order WhatsApp yang hangat dan singkat untuk customer bernama "${customer_name}" yang memesan paket "${tier}". Alamat pengiriman: "${address}". Minta konfirmasi apakah alamat sudah benar dengan balas YA. Gunakan bahasa Indonesia yang ramah. Maksimal 3 kalimat.`;
      confirmMsg = await callClaude(claudePrompt) ||
        `Halo Kak ${customer_name}, terima kasih sudah memesan Behel Care ${tier}! Kami akan kirim ke: ${address}. Apakah sudah benar? Balas YA untuk konfirmasi.`;
    } else {
      const claudePrompt = `Buat pesan konfirmasi order WhatsApp yang hangat dan singkat untuk customer bernama "${customer_name}" yang memesan paket "${tier}". Alamat belum diisi, minta mereka mengirimkan alamat lengkap (RT/RW, Kelurahan, Kecamatan, Kota, Kode Pos). Gunakan bahasa Indonesia yang ramah. Maksimal 3 kalimat.`;
      confirmMsg = await callClaude(claudePrompt) ||
        `Halo Kak ${customer_name}, terima kasih sudah memesan Behel Care ${tier}! Boleh konfirmasi alamat lengkap pengirimannya Kak? (RT/RW, Kelurahan, Kecamatan, Kota, Kode Pos)`;
    }

    // 4. Simpan konfirmasi ke conversations
    await supabase.from('conversations').insert({
      customer_id: customerId,
      phone,
      direction: 'outbound',
      message: confirmMsg,
      handled_by: 'agent',
      is_escalated: false
    });

    // 5. Kirim via Fonnte
    await sendViaFonnte(phone, confirmMsg);

    // 6. Generate reminder schedule
    const reminderRows = schedule.map(dayNumber => {
      const scheduledAt = new Date(orderDate.getTime() + dayNumber * 86400000);
      return {
        customer_id: customerId,
        phone,
        tier,
        day_number: dayNumber,
        message_template: `Reminder hari ke-${dayNumber} untuk program Behel Care ${tier}`,
        scheduled_at: scheduledAt.toISOString(),
        status: 'pending'
      };
    });

    if (reminderRows.length > 0) {
      await supabase.from('reminders').insert(reminderRows);
    }

    return res.status(200).json({
      status: 'ok',
      customer_id: customerId,
      reminders_created: reminderRows.length,
      confirmation_sent: confirmMsg
    });

  } catch (err) {
    console.error('[Order Created] Error:', err);
    return res.status(500).json({ error: err.message });
  }
}
