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

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  try {
    const { phone, message, sent_by = 'human' } = req.body;

    if (!phone || !message) {
      return res.status(400).json({ error: 'Missing phone or message' });
    }

    // 1. Cari customer_id berdasarkan phone
    const { data: customer } = await supabase
      .from('customers')
      .select('id')
      .eq('phone', phone)
      .single();

    // 2. Simpan ke conversations
    await supabase.from('conversations').insert({
      customer_id: customer?.id || null,
      phone,
      direction: 'outbound',
      message,
      handled_by: 'human',
      is_escalated: false
    });

    // 3. Kirim via Fonnte
    const { success, error: sendError } = await sendViaFonnte(phone, message);

    // 4. Resolve open escalation jika ada
    const { data: openEscalation } = await supabase
      .from('escalations')
      .select('id')
      .eq('phone', phone)
      .eq('status', 'open')
      .single();

    if (openEscalation) {
      await supabase
        .from('escalations')
        .update({
          status: 'resolved',
          resolved_by: sent_by,
          resolved_at: new Date().toISOString()
        })
        .eq('id', openEscalation.id);
    }

    if (!success) {
      return res.status(207).json({
        status: 'saved_but_fonnte_failed',
        warning: sendError || 'Gagal kirim via Fonnte'
      });
    }

    return res.status(200).json({ status: 'ok', sent: true });

  } catch (err) {
    console.error('[Agent/Reply] Error:', err);
    return res.status(500).json({ error: err.message });
  }
}
