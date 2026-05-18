import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client.
// The user provided custom URL and Publishable key
const supabaseUrl = 'https://anurxevfvmwpavcoihdj.supabase.co';
const supabaseKey = 'sb_publishable_tXGFzEI19Qv8B5V8RscjxA_rtf_Gal9';

export const supabase = createClient(supabaseUrl, supabaseKey);
