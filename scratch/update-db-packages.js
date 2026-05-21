import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://anurxevfvmwpavcoihdj.supabase.co';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_tXGFzEI19Qv8B5V8RscjxA_rtf_Gal9';

const supabase = createClient(supabaseUrl, supabaseKey);

const newPackages = [
  {
    id: "trial",
    name: "Behel Care Trial Kit",
    price: 59000,
    duration: "14 Hari",
    description: "Coba dulu sebelum komitmen penuh",
    includes: [
      "Noufresh Mouth Spray 10ml pilihan rasa Mint atau Peach",
      "5 pcs Interdental Brush khusus pengguna behel",
      "Akses chat WhatsApp Behel Care Consultant selama 14 hari",
      "Assessment lanjutan gratis setelah 14 hari pemakaian"
    ],
    badge: null,
    highlighted: false
  },
  {
    id: "starter",
    name: "Behel Care Starter",
    price: 179000,
    duration: "30 Hari",
    description: "Mulai rawat behel dengan benar dalam 30 hari",
    includes: [
      "Noufresh Mouthwash 250ml pilihan rasa Mint atau Blueberry",
      "Noufresh Mouth Spray 10ml pilihan rasa Mint atau Peach",
      "Noufresh Purple Toothpaste 20ml untuk mencerahkan gigi secara bertahap",
      "10 pcs Interdental Brush khusus pengguna behel",
      "Orthodontic Wax 1 pak untuk perlindungan dari gesekan kawat",
      "Panduan PDF 30 Hari Pertama Pakai Behel",
      "Akses chat WhatsApp Behel Care Consultant selama 30 hari",
      "Free Ongkir ke seluruh Indonesia"
    ],
    badge: null,
    highlighted: false
  },
  {
    id: "complete",
    name: "Behel Care Complete",
    price: 399000,
    duration: "90 Hari",
    description: "Program pendampingan penuh selama 90 hari",
    includes: [
      "3 botol Noufresh Mouthwash 250ml pilihan Mint atau Blueberry (supply 90 hari)",
      "Noufresh Mouth Spray 20ml pilihan rasa Mint atau Peach",
      "Noufresh Purple Toothpaste 20ml untuk mencerahkan gigi secara konsisten",
      "30 pcs Interdental Brush supply penuh 90 hari",
      "Sikat gigi khusus behel bentuk V untuk menjangkau bawah kawat",
      "Orthodontic Wax 3 pak supply penuh 90 hari",
      "Mirror dental mini untuk pantau kebersihan bracket",
      "Panduan PDF 90 Hari Bebas Sariawan dan Bau Mulut",
      "Chat WhatsApp Behel Care Consultant tanpa batas selama 90 hari",
      "Reminder perawatan harian via WhatsApp",
      "Free Ongkir ke seluruh Indonesia"
    ],
    badge: "Paling Banyak Dipilih",
    highlighted: true
  },
  {
    id: "pro",
    name: "Behel Care Pro",
    price: 749000,
    duration: "180 Hari",
    description: "Pendampingan penuh sampai hari behel dilepas",
    includes: [
      "6 botol Noufresh Mouthwash 250ml pilihan Mint atau Blueberry (supply 180 hari)",
      "2 botol Noufresh Mouth Spray 20ml pilihan rasa Mint atau Peach",
      "2 buah Noufresh Purple Toothpaste 20ml supply penuh 180 hari",
      "60 pcs Interdental Brush supply penuh 180 hari",
      "2 pcs Sikat Gigi Khusus Behel V-Shape termasuk sikat cadangan",
      "Orthodontic Wax 6 pak supply penuh 180 hari",
      "Mirror dental mini",
      "Chat WhatsApp Behel Care Consultant tanpa batas selama 180 hari",
      "Respons prioritas dijawab dalam kurang dari 1 jam",
      "Panduan Whitening Pasca Behel eksklusif",
      "Reminder perawatan harian via WhatsApp",
      "Exclusive gift box packaging",
      "Free Ongkir ke seluruh Indonesia"
    ],
    badge: null,
    highlighted: false
  }
];

async function updateAll() {
  console.log("Starting DB update...");
  for (const pkg of newPackages) {
    const { data, error } = await supabase.from('packages').upsert(pkg);
    if (error) {
      console.error(`Error upserting ${pkg.id}:`, error);
    } else {
      console.log(`Successfully upserted ${pkg.id}`);
    }
  }
  console.log("DB update completed.");
}
updateAll();
