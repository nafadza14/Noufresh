import { Product, NavItem, BankAccount, PaymentMethod } from './types';

export const BRAND_NAME = "Noufresh";

export const NAV_ITEMS: NavItem[] = [
  { label: 'Beranda', href: '#' },
  { label: 'Produk', href: '#products' },
  { label: 'Tentang Kami', href: '#about' },
  { label: 'Kontak', href: '#contact' },
];

export const PRODUCTS: Product[] = [
  {
    id: 1,
    sku: "NF-SPRAY-MINT",
    category_id: 101,
    name: "Noufresh Mouthspray Mint",
    description: "Semprotan penyegar mulut rasa Mint dengan teknologi Nanoenkapsulasi. Sensasi dingin instan.",
    price: 38000,
    original_price: 50000, // 38000 + 30% rounded
    image: "https://i.pinimg.com/736x/08/10/34/0810346e2ded6c86f9004b46f833d0df.jpg",
    tag: "Best Seller",
    ingredients: ["Peppermint Oil", "Xylitol", "Aqua", "Menthol", "Nano-Encapsulated Chitosan"],
    volume: "30ml",
    benefits: [
      "Nafas segar instan",
      "Membunuh bakteri",
      "Rasa Mint yang kuat"
    ],
    usage_instructions: "Semprotkan 1-2 kali.",
    safety_warning: "Hindari kontak mata.",
    stock: 100
  },
  {
    id: 2,
    sku: "NF-SPRAY-PEACH",
    category_id: 101,
    name: "Noufresh Mouthspray Peach",
    description: "Semprotan penyegar mulut aroma Peach yang manis dan menyegarkan. Cocok untuk yang tidak suka pedas.",
    price: 38000,
    original_price: 50000,
    image: "https://i.pinimg.com/736x/8d/99/b9/8d99b9eda78a52284f726f06119d0c14.jpg",
    tag: "New",
    ingredients: ["Peach Extract", "Xylitol", "Aqua", "Nano-Encapsulated Chitosan"],
    volume: "30ml",
    benefits: [
      "Aroma buah segar",
      "Manis tanpa gula",
      "Praktis dibawa"
    ],
    usage_instructions: "Semprotkan 1-2 kali.",
    safety_warning: "Hindari kontak mata.",
    stock: 100
  },
  {
    id: 3,
    sku: "NF-WASH-MINT",
    category_id: 102,
    name: "Noufresh Mouthwash Mint",
    description: "Obat kumur rasa Mint tanpa alkohol. Membersihkan sela gigi dan menyegarkan nafas lebih lama.",
    price: 67000,
    original_price: 88000,
    image: "https://i.pinimg.com/736x/a9/74/3c/a9743c0c7658dc3ae4cdb1f7173f0153.jpg",
    tag: "Favorite",
    ingredients: ["Peppermint", "Fluoride", "Cetylpyridinium Chloride", "Sorbitol"],
    volume: "250ml",
    benefits: [
      "0% Alkohol",
      "Anti Plak",
      "Kesegaran Ekstra"
    ],
    usage_instructions: "Kumur 30 detik.",
    safety_warning: "Jangan ditelan.",
    stock: 80
  },
  {
    id: 4,
    sku: "NF-WASH-BLUE",
    category_id: 102,
    name: "Noufresh Mouthwash Blueberry",
    description: "Mouthwash rasa Blueberry unik yang disukai semua kalangan. Perlindungan total untuk gigi dan gusi.",
    price: 67000,
    original_price: 88000,
    image: "https://i.pinimg.com/736x/55/96/b5/5596b57ab2c848b79daef8d9ff0d174a.jpg",
    ingredients: ["Blueberry Extract", "Fluoride", "Sorbitol", "Nano Chitosan"],
    volume: "250ml",
    benefits: [
      "Rasa buah enak",
      "Tidak perih di mulut",
      "Mencegah gigi berlubang"
    ],
    usage_instructions: "Kumur 30 detik.",
    safety_warning: "Jangan ditelan.",
    stock: 80
  },
  {
    id: 5,
    sku: "NF-BOOST-WHITE",
    category_id: 103,
    name: "Teeth Whitening Booster",
    description: "Booster pemutih gigi inovatif untuk senyum lebih cerah dan percaya diri. Hasil terlihat dalam penggunaan rutin.",
    price: 78000,
    original_price: 102000,
    image: "https://i.pinimg.com/736x/e4/6b/34/e46b34c74422b690d9bb71c4fda1b2e6.jpg",
    tag: "Viral",
    ingredients: ["Papain Enzyme", "Strawberry Extract", "Purple Corrector"],
    volume: "100g",
    benefits: [
      "Memutihkan gigi",
      "Aman untuk enamel",
      "Membersihkan noda kopi/teh"
    ],
    usage_instructions: "Sikat gigi 2 menit.",
    safety_warning: "Hentikan jika iritasi.",
    stock: 50
  }
];

export const CONTACT_INFO = {
  email: "hallo@noorwalida.com",
  phone: "+62 88108 023377",
  whatsapp_link: "https://wa.me/6285157626264",
  address: "Bandung Suwuk, Dadapan, Pendowoharjo, Kec. Sewon, Kabupaten Bantul, Daerah Istimewa Yogyakarta",
  company: "PT. Noor Walida Kosmetika"
};

export const BANK_ACCOUNTS: BankAccount[] = [
  {
    bank_name: "BCA",
    account_number: "123 456 7890",
    account_holder: "PT NOOR WALIDA KOSMETIKA",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Bank_Central_Asia.svg/2560px-Bank_Central_Asia.svg.png"
  },
  {
    bank_name: "Mandiri",
    account_number: "098 765 4321",
    account_holder: "PT NOOR WALIDA KOSMETIKA",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Bank_Mandiri_logo_2016.svg/2560px-Bank_Mandiri_logo_2016.svg.png"
  }
];

export const PAYMENT_METHODS: PaymentMethod[] = [
  { id: 'qris', name: 'QRIS', description: 'Scan QR untuk pembayaran instan', icon: 'qr-code' },
  { id: 'transfer', name: 'Bank Transfer', description: 'BCA, Mandiri, BNI, BRI', icon: 'building-library' },
  { id: 'cod', name: 'COD', description: 'Bayar ditempat saat barang sampai', icon: 'banknotes' },
];