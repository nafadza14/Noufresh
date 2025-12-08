export interface Product {
  id: number;
  sku: string;
  name: string;
  category_id: number;
  description: string;
  price: number;
  original_price: number; // For strikethrough display
  image: string;
  tag?: string;
  
  // Specific Oral Care Fields
  ingredients: string[];
  volume: string;
  benefits: string[];
  usage_instructions: string;
  safety_warning: string;
  stock: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface PaymentMethod {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface BankAccount {
  bank_name: string;
  account_number: string;
  account_holder: string;
  logo: string;
}