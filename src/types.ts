export type Category = 'all' | 'evening' | 'silk-slip' | 'linen-resort' | 'cocktail';

export interface DressColor {
  name: string;
  hex: string;
  image?: string;
}

export interface DressProduct {
  id: string;
  name: string;
  subtitle: string;
  category: Category;
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  image: string;
  secondaryImage?: string;
  colors: DressColor[];
  sizes: ('XS' | 'S' | 'M' | 'L' | 'XL')[];
  fabric: string;
  origin: string;
  silhouette: string;
  length: 'Mini' | 'Midi' | 'Maxi' | 'Floor-Length';
  description: string;
  details: string[];
  careInstructions: string;
  inStock: boolean;
  isLimitedEdition?: boolean;
  badge?: string;
  modelMeasurements: string;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  size: 'XS' | 'S' | 'M' | 'L' | 'XL';
  color: string;
  quantity: number;
  fabric: string;
  bespokeHemming?: boolean;
}

export interface OrderDetails {
  orderId: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  giftBox: boolean;
  total: number;
  createdAt: string;
  paymentMethod: string;
}

export type Currency = 'USD' | 'EUR' | 'GBP';
