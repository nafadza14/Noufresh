export interface PricingTier {
  id: string;
  tier_name: string;
  full_name: string;
  duration_days: number;
  badge: string | null;
  highlighted: boolean;
  pricing: {
    original_price: number;
    original_price_display: string;
    sale_price: number;
    sale_price_display: string;
    price_per_day: number;
    price_per_day_display: string;
    savings_amount: number;
    savings_display: string;
    savings_percentage: string;
    value_framing?: string[];
  };
  tagline: string;
  description: string;
  kit_contents_display: string[];
  homepage_items: string[];
  cta: {
    label: string;
    href: string;
    style: 'primary' | 'secondary';
  };
  trust_elements: string[];
  anchor_framing: string | null;
}

export const PRICING_TIERS: PricingTier[] = [
  {
    id: "trial",
    tier_name: "Trial",
    full_name: "Behel Care Trial Kit",
    duration_days: 14,
    badge: null,
    highlighted: false,
    pricing: {
      original_price: 89000,
      original_price_display: "Rp 89.000",
      sale_price: 59000,
      sale_price_display: "Rp 59.000",
      price_per_day: 4214,
      price_per_day_display: "Rp 4.214 per hari",
      savings_amount: 30000,
      savings_display: "Hemat Rp 30.000",
      savings_percentage: "34%"
    },
    tagline: "Coba dulu sebelum komitmen penuh",
    description: "Rasakan perbedaan 3 produk Noufresh dalam 14 hari pertama perawatan behelmu.",
    kit_contents_display: [
      "Noufresh Mouth Spray 10ml pilihan rasa Mint atau Peach",
      "5 pcs Interdental Brush khusus pengguna behel",
      "Akses chat WhatsApp Behel Care Consultant selama 14 hari",
      "Assessment lanjutan gratis setelah 14 hari pemakaian"
    ],
    homepage_items: [
      "Noufresh Mouth Spray 10ml pilihan rasa Mint atau Peach",
      "5 pcs Interdental Brush khusus pengguna behel",
      "Akses chat WhatsApp Behel Care Consultant selama 14 hari",
      "Assessment lanjutan gratis setelah 14 hari pemakaian"
    ],
    cta: {
      label: "Coba Trial Kit",
      href: "/checkout/trial",
      style: "secondary"
    },
    trust_elements: [],
    anchor_framing: null
  },
  {
    id: "starter",
    tier_name: "Starter",
    full_name: "Behel Care Starter",
    duration_days: 30,
    badge: null,
    highlighted: false,
    pricing: {
      original_price: 259000,
      original_price_display: "Rp 259.000",
      sale_price: 179000,
      sale_price_display: "Rp 179.000",
      price_per_day: 5967,
      price_per_day_display: "Rp 5.967 per hari",
      savings_amount: 80000,
      savings_display: "Hemat Rp 80.000",
      savings_percentage: "31%"
    },
    tagline: "Mulai rawat behel dengan benar dalam 30 hari",
    description: "Paket lengkap untuk 30 hari pertama perawatan behel. Semua yang kamu butuhkan sudah ada dalam satu kotak.",
    kit_contents_display: [
      "Noufresh Mouthwash 250ml pilihan rasa Mint atau Blueberry",
      "Noufresh Mouth Spray 10ml pilihan rasa Mint atau Peach",
      "Noufresh Purple Toothpaste 20ml untuk mencerahkan gigi secara bertahap",
      "10 pcs Interdental Brush khusus pengguna behel",
      "Orthodontic Wax 1 pak untuk perlindungan dari gesekan kawat",
      "Panduan PDF 30 Hari Pertama Pakai Behel",
      "Akses chat WhatsApp Behel Care Consultant selama 30 hari",
      "Free Ongkir ke seluruh Indonesia"
    ],
    homepage_items: [
      "Noufresh Mouthwash 250ml pilihan rasa Mint atau Blueberry",
      "Noufresh Mouth Spray 10ml pilihan rasa Mint atau Peach",
      "Noufresh Purple Toothpaste 20ml untuk mencerahkan gigi",
      "10 pcs Interdental Brush dan Orthodontic Wax",
      "Chat WhatsApp Behel Care Consultant 30 hari"
    ],
    cta: {
      label: "Mulai Program Starter",
      href: "/checkout/starter",
      style: "secondary"
    },
    trust_elements: [
      "BPOM & Halal Certified"
    ],
    anchor_framing: "Lebih murah dari 1x kontrol ortho bulananmu"
  },
  {
    id: "complete",
    tier_name: "Complete",
    full_name: "Behel Care Complete",
    duration_days: 90,
    badge: "Paling Banyak Dipilih",
    highlighted: true,
    pricing: {
      original_price: 579000,
      original_price_display: "Rp 579.000",
      sale_price: 399000,
      sale_price_display: "Rp 399.000",
      price_per_day: 4433,
      price_per_day_display: "Rp 4.433 per hari",
      savings_amount: 180000,
      savings_display: "Hemat Rp 180.000",
      savings_percentage: "31%",
      value_framing: [
        "Rp 4.433 per hari",
        "Kurang dari 1x kontrol ortho untuk 90 hari penuh",
        "Kurang dari 3% dari biaya pasang behelmu"
      ]
    },
    tagline: "Program pendampingan penuh selama 90 hari",
    description: "Satu paket lengkap dengan semua produk Noufresh dan pendampingan konsultasi tanpa batas selama 90 hari. Cukup satu pembelian untuk tiga bulan perawatan penuh.",
    kit_contents_display: [
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
    homepage_items: [
      "3 botol Noufresh Mouthwash 250ml supply 90 hari",
      "Noufresh Mouth Spray 20ml dan Purple Toothpaste 20ml",
      "30 pcs Interdental Brush, Sikat Behel V Shape, Wax 3 pak",
      "Chat WhatsApp Behel Care Consultant tanpa batas 90 hari",
      "Reminder harian via WhatsApp dan Panduan PDF"
    ],
    cta: {
      label: "Mulai Program Complete",
      href: "/checkout/complete",
      style: "primary"
    },
    trust_elements: [
      "BPOM & Halal Certified",
      "Garansi 30 hari uang kembali"
    ],
    anchor_framing: "Kurang dari 1x kontrol ortho untuk 90 hari perawatan penuh"
  },
  {
    id: "pro",
    tier_name: "Pro",
    full_name: "Behel Care Pro",
    duration_days: 180,
    badge: null,
    highlighted: false,
    pricing: {
      original_price: 1099000,
      original_price_display: "Rp 1.099.000",
      sale_price: 749000,
      sale_price_display: "Rp 749.000",
      price_per_day: 4161,
      price_per_day_display: "Rp 4.161 per hari",
      savings_amount: 350000,
      savings_display: "Hemat Rp 350.000",
      savings_percentage: "32%",
      value_framing: [
        "Harga per hari lebih murah dari Complete",
        "Pendampingan penuh sampai behelmu lepas"
      ]
    },
    tagline: "Pendampingan penuh sampai hari behel dilepas",
    description: "Paket terlengkap untuk 180 hari perawatan, dengan supply produk Noufresh dua kali lipat dan respons prioritas dari Behel Care Consultant.",
    kit_contents_display: [
      "6 botol Noufresh Mouthwash 250ml pilihan Mint atau Blueberry (supply 180 hari)",
      "2 botol Noufresh Mouth Spray 20ml pilihan rasa Mint atau Peach",
      "2 buah Noufresh Purple Toothpaste 20ml supply penuh 180 hari",
      "60 pcs Interdental Brush supply penuh 180 hari",
      "2 pcs Sikat Gigi Khusus Behel V Shape termasuk sikat cadangan",
      "Orthodontic Wax 6 pak supply penuh 180 hari",
      "Mirror dental mini",
      "Chat WhatsApp Behel Care Consultant tanpa batas selama 180 hari",
      "Respons prioritas dijawab dalam kurang dari 1 jam",
      "Panduan Whitening Pasca Behel eksklusif",
      "Reminder perawatan harian via WhatsApp",
      "Exclusive gift box packaging",
      "Free Ongkir ke seluruh Indonesia"
    ],
    homepage_items: [
      "6 botol Noufresh Mouthwash 250ml supply 180 hari",
      "2 botol Mouth Spray 20ml dan 2 buah Purple Toothpaste 20ml",
      "60 pcs Interdental Brush dan aksesori lengkap 180 hari",
      "Chat WhatsApp tanpa batas 180 hari dengan respons prioritas",
      "Panduan Whitening Pasca Behel eksklusif dan gift box"
    ],
    cta: {
      label: "Mulai Program Pro",
      href: "/checkout/pro",
      style: "secondary"
    },
    trust_elements: [
      "BPOM & Halal Certified",
      "Garansi 30 hari uang kembali"
    ],
    anchor_framing: "Harga per hari lebih murah dari paket Complete"
  }
];
