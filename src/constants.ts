import { Product, NavItem, BankAccount, PaymentMethod } from './types';

export const BRAND_NAME = "noufresh";

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "Products", href: "#products" },
  { label: "About us", href: "#about" },
  { label: "Testimonial", href: "#testimonial" },
  { label: "Contact", href: "#contact" },
];

export const SERVICES = [
  { label: "Mouthspray", active: true },
  { label: "Mouthwash", active: false },
  { label: "Teeth whitening", active: false },
  { label: "Oral health", active: false },
  { label: "Fresh breath", active: false },
];

export const PRODUCTS: Product[] = [
  {
    id: 1,
    sku: "NF-MW-MINT",
    category_id: 2,
    name: "Noufresh Mouthwash Mint",
    description: "Instant fresh breath with nano technology. The perfect companion for your active lifestyle.",
    price: 45000,
    original_price: 65000,
    image: "https://i.pinimg.com/736x/3b/91/d7/3b91d74674616032734f98d8262eb052.jpg",
    tag: "New",
    ingredients: ["Water", "Glycerin", "Menthol", "Nano Chitosan"],
    formulated_without: ["Alcohol", "Parabens", "SLS"],
    how_to_use: "Rinse for 30 seconds after brushing.",
    volume: "250ml",
    benefits: ["Long lasting freshness", "Gum protection", "Alcohol free"],
    usage_instructions: "Use twice daily.",
    safety_warning: "Do not swallow.",
    stock: 500
  },
  {
    id: 2,
    sku: "NF-MW-BLUEBERRY",
    category_id: 2,
    name: "Noufresh Mouthwash Blueberry",
    description: "Fruity freshness with the same powerful nano technology protection.",
    price: 45000,
    original_price: 65000,
    image: "https://i.pinimg.com/736x/25/2e/01/252e014cb899c846b2a52d4ef3cff867.jpg",
    tag: "Popular",
    ingredients: ["Water", "Glycerin", "Blueberry Extract", "Nano Chitosan"],
    formulated_without: ["Alcohol", "Parabens", "SLS"],
    how_to_use: "Rinse for 30 seconds after brushing.",
    volume: "250ml",
    benefits: ["Fruity taste", "Gentle on gums", "Nano protection"],
    usage_instructions: "Use twice daily.",
    safety_warning: "Do not swallow.",
    stock: 450
  },
  {
    id: 3,
    sku: "NF-MW-PEPPERMINT",
    category_id: 2,
    name: "Noufresh Mouthwash PeppermintMint",
    description: "Extra cool peppermint for an intense fresh sensation.",
    price: 45000,
    original_price: 65000,
    image: "https://i.pinimg.com/736x/6d/8f/c2/6d8fc2dc85d323248a4560a08880191a.jpg",
    tag: "Cooling",
    ingredients: ["Water", "Glycerin", "Peppermint Oil", "Nano Encapsulated Freshness"],
    formulated_without: ["Alcohol", "Sugar", "Artificial Colors"],
    how_to_use: "Spray 1-2 times directly into mouth.",
    volume: "30ml",
    benefits: ["Intense freshness", "Deep clean", "Nano technology"],
    usage_instructions: "Use as needed throughout the day.",
    safety_warning: "Avoid contact with eyes.",
    stock: 300,
    sizes: [
      { id: 'mini', label: 'Mini Size', volume: '10 ml', price: 25000 },
      { id: 'full', label: 'Full Size', volume: '30 ml', price: 45000 }
    ]
  },
  {
    id: 4,
    sku: "NF-MS-PEACH",
    category_id: 1,
    name: "Noufresh Mouthspray Peach",
    description: "Sweet peach flavor combined with instant freshness technology.",
    price: 38000,
    original_price: 50000,
    image: "https://i.pinimg.com/736x/3b/91/d7/3b91d74674616032734f98d8262eb052.jpg",
    tag: "Trending",
    ingredients: ["Water", "Glycerin", "Peach Extract", "Nano Encapsulated Freshness"],
    formulated_without: ["Alcohol", "Sugar", "Artificial Colors"],
    how_to_use: "Spray 1-2 times directly into mouth.",
    volume: "30ml",
    benefits: ["Sweet peach taste", "Instant confidence", "Nano technology"],
    usage_instructions: "Use as needed throughout the day.",
    safety_warning: "Avoid contact with eyes.",
    stock: 800,
    sizes: [
      { id: 'mini', label: 'Mini Size', volume: '10 ml', price: 25000 },
      { id: 'full', label: 'Full Size', volume: '20 ml', price: 38000 }
    ]
  }
];

export const CONTACT_INFO = {
  email: "hello@noufresh.id",
  phone: "+62 812 3456 7890",
  whatsapp_link: "https://wa.me/6281234567890",
  address: "Jakarta, Indonesia",
  maps_link: "https://maps.app.goo.gl/3ZnsG66CTi6RcDNB9",
  company: "noufresh indonesia",
  socials: {
    facebook: "#",
    instagram: "#",
    twitter: "#",
    youtube: "#"
  }
};

export const BANK_ACCOUNTS: BankAccount[] = [
  {
    bank_name: "BCA",
    account_number: "123 456 7890",
    account_holder: "NOUFRESH INDONESIA",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Bank_Central_Asia.svg/2560px-Bank_Central_Asia.svg.png"
  }
];

export const PAYMENT_METHODS: PaymentMethod[] = [
  { id: 'qris', name: 'QRIS', description: 'Scan QR untuk pembayaran instan', icon: 'qr-code' },
  { id: 'transfer', name: 'Bank transfer', description: 'BCA, Mandiri, BNI, BRI', icon: 'building-library' },
];
