import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || 'https://anurxevfvmwpavcoihdj.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    if (req.method === 'GET') {
      // Ambil semua config sebagai key-value object
      const { data, error } = await supabase
        .from('agent_config')
        .select('config_key, config_value, description, updated_at');

      if (error) throw error;

      const config = {};
      (data || []).forEach(row => {
        config[row.config_key] = {
          value: row.config_value,
          description: row.description,
          updated_at: row.updated_at
        };
      });

      return res.status(200).json({ config });

    } else if (req.method === 'PATCH') {
      const { config_key, config_value } = req.body;

      if (!config_key || config_value === undefined) {
        return res.status(400).json({ error: 'Missing config_key or config_value' });
      }

      const { error } = await supabase
        .from('agent_config')
        .update({ config_value, updated_at: new Date().toISOString() })
        .eq('config_key', config_key);

      if (error) throw error;

      return res.status(200).json({ status: 'ok', config_key, config_value });

    } else {
      return res.status(405).json({ error: 'Method Not Allowed' });
    }
  } catch (err) {
    console.error('[Agent/Config] Error:', err);
    return res.status(500).json({ error: err.message });
  }
}
