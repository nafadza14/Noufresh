-- ============================================================
-- Noufresh Care — Agentic Feature Schema
-- Jalankan seluruh file ini di Supabase SQL Editor
-- ============================================================

-- 1. Tabel Customers
CREATE TABLE IF NOT EXISTS customers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text UNIQUE NOT NULL,
  email text,
  tier text CHECK (tier IN ('Trial','Starter','Complete','Pro')),
  program_start_date date,
  program_end_date date,
  address text,
  status text DEFAULT 'active',
  created_at timestamptz DEFAULT now()
);

-- 2. Tabel Orders (versi baru dengan UUID & customer_id)
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_code text UNIQUE NOT NULL,
  customer_id uuid REFERENCES customers(id),
  product_name text,
  tier text,
  total integer,
  address text,
  status text DEFAULT 'pending_confirmation',
  created_at timestamptz DEFAULT now()
);

-- 3. Tabel Conversations
CREATE TABLE IF NOT EXISTS conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid REFERENCES customers(id),
  phone text NOT NULL,
  direction text CHECK (direction IN ('inbound','outbound')),
  message text NOT NULL,
  handled_by text CHECK (handled_by IN ('agent','human')),
  is_escalated boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- 4. Tabel Reminders
CREATE TABLE IF NOT EXISTS reminders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid REFERENCES customers(id),
  phone text NOT NULL,
  tier text,
  day_number integer,
  message_template text,
  scheduled_at timestamptz,
  sent_at timestamptz,
  status text DEFAULT 'pending' CHECK (status IN ('pending','sent','failed','skipped')),
  created_at timestamptz DEFAULT now()
);

-- 5. Tabel Escalations
CREATE TABLE IF NOT EXISTS escalations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid REFERENCES customers(id),
  phone text NOT NULL,
  trigger_message text,
  conversation_snippet text,
  status text DEFAULT 'open' CHECK (status IN ('open','resolved')),
  resolved_by text,
  resolved_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- 6. Tabel Agent Config
CREATE TABLE IF NOT EXISTS agent_config (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  config_key text UNIQUE NOT NULL,
  config_value text NOT NULL,
  description text,
  updated_at timestamptz DEFAULT now()
);

-- 7. Seed data default agent_config
INSERT INTO agent_config (config_key, config_value, description) VALUES
(
  'system_prompt',
  'Kamu adalah Nadia, konsultan perawatan behel dari Noufresh Care. Kamu ramah, suportif, dan membantu customer merawat behel mereka dengan benar. Jawab dalam bahasa Indonesia yang hangat tapi profesional. Jangan membuat klaim medis yang berlebihan. Fokus pada produk Noufresh dan cara penggunaannya.',
  'Persona utama AI agent'
),
(
  'knowledge_base',
  'Produk Noufresh Care dirancang khusus untuk pemilik behel. Trial 14 hari, Starter 30 hari, Complete dan Pro untuk perawatan lebih lengkap. Produk mengandung bahan-bahan yang aman untuk gigi dan kawat behel.',
  'Pengetahuan produk untuk agent'
),
(
  'escalation_keywords',
  'komplain,tipu,bohong,refund,kembalikan uang,tidak bekerja,reaksi alergi,sakit parah,dokter,berbahaya',
  'Kata-kata trigger eskalasi ke manusia'
),
(
  'agent_enabled',
  'true',
  'Toggle global agent on/off'
)
ON CONFLICT (config_key) DO NOTHING;

-- 8. Enable Row Level Security
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE reminders ENABLE ROW LEVEL SECURITY;
ALTER TABLE escalations ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_config ENABLE ROW LEVEL SECURITY;

-- 9. RLS Policies — izinkan service_role (dipakai di API routes server-side)
-- Conversations
CREATE POLICY IF NOT EXISTS "service_role_all_conversations" ON conversations
  FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY IF NOT EXISTS "anon_read_conversations" ON conversations
  FOR SELECT USING (true);
CREATE POLICY IF NOT EXISTS "anon_insert_conversations" ON conversations
  FOR INSERT WITH CHECK (true);

-- Customers
CREATE POLICY IF NOT EXISTS "service_role_all_customers" ON customers
  FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY IF NOT EXISTS "anon_read_customers" ON customers
  FOR SELECT USING (true);
CREATE POLICY IF NOT EXISTS "anon_insert_customers" ON customers
  FOR INSERT WITH CHECK (true);
CREATE POLICY IF NOT EXISTS "anon_update_customers" ON customers
  FOR UPDATE USING (true);

-- Orders
CREATE POLICY IF NOT EXISTS "service_role_all_orders" ON orders
  FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY IF NOT EXISTS "anon_all_orders" ON orders
  FOR ALL USING (true);

-- Reminders
CREATE POLICY IF NOT EXISTS "service_role_all_reminders" ON reminders
  FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY IF NOT EXISTS "anon_all_reminders" ON reminders
  FOR ALL USING (true);

-- Escalations
CREATE POLICY IF NOT EXISTS "service_role_all_escalations" ON escalations
  FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY IF NOT EXISTS "anon_all_escalations" ON escalations
  FOR ALL USING (true);

-- Agent Config
CREATE POLICY IF NOT EXISTS "service_role_all_agent_config" ON agent_config
  FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY IF NOT EXISTS "anon_read_agent_config" ON agent_config
  FOR SELECT USING (true);
CREATE POLICY IF NOT EXISTS "anon_update_agent_config" ON agent_config
  FOR UPDATE USING (true);

-- Indexes untuk performa query
CREATE INDEX IF NOT EXISTS idx_conversations_phone ON conversations(phone);
CREATE INDEX IF NOT EXISTS idx_conversations_created_at ON conversations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_reminders_status ON reminders(status);
CREATE INDEX IF NOT EXISTS idx_reminders_scheduled_at ON reminders(scheduled_at);
CREATE INDEX IF NOT EXISTS idx_escalations_phone ON escalations(phone);
CREATE INDEX IF NOT EXISTS idx_escalations_status ON escalations(status);
