import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://anurxevfvmwpavcoihdj.supabase.co';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_tXGFzEI19Qv8B5V8RscjxA_rtf_Gal9';

const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  const { data, error } = await supabase.from('packages').select('*');
  console.log('Error:', error);
  console.log('Packages:', JSON.stringify(data, null, 2));
}
check();
