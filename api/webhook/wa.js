import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';

// ============================================================
// Supabase client dengan service role (bypass RLS)
// ============================================================
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || 'https://anurxevfvmwpavcoihdj.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

// ============================================================
// Helper: Normalisasi nomor WA ke format 628xxx
// ============================================================
function normalizePhone(phone) {
  let p = String(phone).replace(/\D/g, '');
  if (p.startsWith('0')) p = '62' + p.slice(1);
  if (p.startsWith('+62')) p = p.slice(1);
  if (!p.startsWith('62')) p = '62' + p;
  return p;
}

// ============================================================
// Helper: Kirim pesan via Fonnte
// ============================================================
async function sendViaFonnte(target, message) {
  const token = process.env.FONNTE_API_TOKEN;
  if (!token) {
    console.warn('[Fonnte] FONNTE_API_TOKEN tidak diset — skip pengiriman');
    return { success: false, error: 'No token' };
  }
  try {
    const res = await fetch('https://api.fonnte.com/send', {
      method: 'POST',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ target, message })
    });
    const data = await res.json();
    return { success: res.ok, data };
  } catch (err) {
    console.error('[Fonnte] Error:', err);
    return { success: false, error: err.message };
  }
}

// ============================================================
// Helper: Panggil Claude API
// ============================================================
async function callClaude(systemPrompt, messages) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.warn('[Claude] ANTHROPIC_API_KEY tidak diset — fallback mode');
    return 'Terima kasih sudah menghubungi Noufresh Care! Tim kami akan segera membalas pesan Anda.';
  }
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
        max_tokens: 1024,
        system: systemPrompt,
        messages
      })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error?.message || 'Claude API Error');
    return data.content?.[0]?.text || '';
  } catch (err) {
    console.error('[Claude] Error:', err);
    return 'Terima kasih sudah menghubungi Noufresh Care! Ada yang bisa kami bantu?';
  }
}

// ============================================================
// Helper: Ambil semua agent_config sebagai object key-value
// ============================================================
async function getAgentConfig() {
  const { data } = await supabase.from('agent_config').select('config_key, config_value');
  const config = {};
  (data || []).forEach(row => { config[row.config_key] = row.config_value; });
  return config;
}

// ============================================================
// Main Handler
// ============================================================
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Webhook-Secret');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  try {
    // 1. Validasi webhook secret (opsional, aktifkan jika FONNTE_WEBHOOK_SECRET diset)
    const webhookSecret = process.env.FONNTE_WEBHOOK_SECRET;
    if (webhookSecret) {
      const incomingSecret = req.headers['x-webhook-secret'];
      if (incomingSecret !== webhookSecret) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
    }

    // 2. Parse body Fonnte
    const body = req.body;
    const senderRaw = body.sender || body.from || '';
    const message = body.message || body.text || '';
    const name = body.name || body.pushname || 'Customer';

    if (!senderRaw || !message) {
      return res.status(400).json({ error: 'Missing sender or message' });
    }

    const phone = normalizePhone(senderRaw);

    // 3. Cek/buat customer
    let customerId = null;
    const { data: existingCustomer } = await supabase
      .from('customers')
      .select('id')
      .eq('phone', phone)
      .single();

    if (existingCustomer) {
      customerId = existingCustomer.id;
    } else {
      const { data: newCustomer } = await supabase
        .from('customers')
        .insert({ name, phone, status: 'active' })
        .select('id')
        .single();
      customerId = newCustomer?.id;
    }

    // 4. Simpan pesan inbound ke conversations
    await supabase.from('conversations').insert({
      customer_id: customerId,
      phone,
      direction: 'inbound',
      message,
      handled_by: 'agent',
      is_escalated: false
    });

    // 5. Cek escalation keywords
    const config = await getAgentConfig();
    const keywords = (config.escalation_keywords || '').split(',').map(k => k.trim().toLowerCase());
    const messageLower = message.toLowerCase();
    const isEscalated = keywords.some(kw => kw && messageLower.includes(kw));

    if (isEscalated) {
      // Ambil 5 pesan terakhir sebagai snippet
      const { data: recentMsgs } = await supabase
        .from('conversations')
        .select('direction, message')
        .eq('phone', phone)
        .order('created_at', { ascending: false })
        .limit(5);
      const snippet = (recentMsgs || []).map(m => `[${m.direction}] ${m.message}`).join('\n');

      // Update konversasi terakhir sebagai eskalasi
      await supabase
        .from('conversations')
        .update({ is_escalated: true })
        .eq('phone', phone)
        .order('created_at', { ascending: false })
        .limit(1);

      // Simpan ke tabel escalations
      await supabase.from('escalations').insert({
        customer_id: customerId,
        phone,
        trigger_message: message,
        conversation_snippet: snippet,
        status: 'open'
      });

      return res.status(200).json({ status: 'escalated' });
    }

    // 6. Cek agent enabled
    if (config.agent_enabled !== 'true') {
      return res.status(200).json({ status: 'agent_disabled' });
    }

    // 7. Ambil 20 pesan terakhir sebagai history
    const { data: historyRows } = await supabase
      .from('conversations')
      .select('direction, message')
      .eq('phone', phone)
      .order('created_at', { ascending: false })
      .limit(20);

    const history = (historyRows || []).reverse().map(row => ({
      role: row.direction === 'inbound' ? 'user' : 'assistant',
      content: row.message
    }));

    // 8. Susun system prompt dengan knowledge base
    const systemPrompt = `${config.system_prompt || ''}\n\nInformasi Produk:\n${config.knowledge_base || ''}`;

    // 9. Panggil Claude
    const agentReply = await callClaude(systemPrompt, [
      ...history,
      { role: 'user', content: message }
    ]);

    // 10. Simpan balasan ke conversations
    await supabase.from('conversations').insert({
      customer_id: customerId,
      phone,
      direction: 'outbound',
      message: agentReply,
      handled_by: 'agent',
      is_escalated: false
    });

    // 11. Kirim via Fonnte
    await sendViaFonnte(phone, agentReply);

    return res.status(200).json({ status: 'ok', reply: agentReply });

  } catch (err) {
    console.error('[WA Webhook] Error:', err);
    return res.status(500).json({ error: err.message });
  }
}
