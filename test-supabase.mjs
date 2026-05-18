import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://anurxevfvmwpavcoihdj.supabase.co';
const supabaseKey = 'sb_publishable_tXGFzEI19Qv8B5V8RscjxA_rtf_Gal9';

const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  const { data, error } = await supabase.from('orders').insert([{
    id: 'TEST-123',
    customer_name: 'Test',
    customer_phone: '123',
    shipping_address: 'Test',
    product_name: 'Test',
    total_price: 1000,
    status: 'Menunggu Pembayaran'
  }]);
  console.log('Result error:', error);
}
test();
