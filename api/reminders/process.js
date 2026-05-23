import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || 'https://anurxevfvmwpavcoihdj.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

async function sendViaFonnte(target, message) {
  const token = process.env.FONNTE_API_TOKEN;
  if (!token) return { success: false, error: 'No token' };
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

async function generateReminderMessage(customerName, tier, dayNumber) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return `Halo Kak ${customerName}! Ini pengingat hari ke-${dayNumber} program Behel Care ${tier} kamu. Jangan lupa rutin gunakan produk Noufresh ya Kak! Ada yang ingin ditanyakan?`;
  }
  try {
    const prompt = `Buat pesan reminder WhatsApp hari ke-${dayNumber} untuk customer bernama "${customerName}" pengguna program Behel Care ${tier}. Pesan harus singkat (max 3 kalimat), hangat, suportif, dan mendorong konsistensi penggunaan produk. Gunakan bahasa Indonesia yang natural seperti karyawan toko yang ramah, bukan seperti bot. Jangan gunakan tanda hubung di tengah kalimat.`;
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 300,
        messages: [{ role: 'user', content: prompt }]
      })
    });
    const data = await res.json();
    return data.content?.[0]?.text || `Halo Kak ${customerName}! Pengingat hari ke-${dayNumber} program ${tier} kamu. Tetap semangat merawat behel ya Kak!`;
  } catch {
    return `Halo Kak ${customerName}! Pengingat hari ke-${dayNumber} program Behel Care ${tier} kamu. Tetap semangat ya Kak!`;
  }
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  try {
    // Izinkan juga proses single reminder_id (dari dashboard Kirim Sekarang)
    const { reminder_id } = req.body || {};

    let reminders = [];

    if (reminder_id) {
      // Proses satu reminder spesifik
      const { data } = await supabase
        .from('reminders')
        .select('*, customers(name, phone)')
        .eq('id', reminder_id)
        .single();
      if (data) reminders = [data];
    } else {
      // Proses semua pending reminder yang sudah waktunya
      const { data } = await supabase
        .from('reminders')
        .select('*, customers(name, phone)')
        .eq('status', 'pending')
        .lte('scheduled_at', new Date().toISOString());
      reminders = data || [];
    }

    let sent = 0;
    let failed = 0;

    for (const reminder of reminders) {
      try {
        const customerName = reminder.customers?.name || 'Kak';
        const message = await generateReminderMessage(customerName, reminder.tier, reminder.day_number);

        const { success } = await sendViaFonnte(reminder.phone, message);

        if (success) {
          await supabase
            .from('reminders')
            .update({ status: 'sent', sent_at: new Date().toISOString(), message_template: message })
            .eq('id', reminder.id);

          // Simpan ke conversations
          await supabase.from('conversations').insert({
            customer_id: reminder.customer_id,
            phone: reminder.phone,
            direction: 'outbound',
            message,
            handled_by: 'agent',
            is_escalated: false
          });

          sent++;
        } else {
          await supabase
            .from('reminders')
            .update({ status: 'failed' })
            .eq('id', reminder.id);
          failed++;
        }
      } catch (reminderErr) {
        console.error('[Reminders] Error processing reminder:', reminder.id, reminderErr);
        await supabase
          .from('reminders')
          .update({ status: 'failed' })
          .eq('id', reminder.id);
        failed++;
      }
    }

    return res.status(200).json({
      status: 'ok',
      processed: reminders.length,
      sent,
      failed
    });

  } catch (err) {
    console.error('[Reminders/Process] Error:', err);
    return res.status(500).json({ error: err.message });
  }
}
