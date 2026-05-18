import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

async function test() {
  const { data, error } = await supabase.from('orders').insert([{
    id: 'TEST-123',
    customer_name: 'Test',
    customer_phone: '123',
    shipping_address: 'Test',
    product_name: 'Test',
    total_price: 1000,
  }]);
  console.log('Result:', { data, error });
}
test();
