export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: Category;
  price: number;
  image: string;
  unit: string;
  stock: number;
  isOrganic: boolean;
  isOnSale: boolean;
  rating: number;
}

export type Category = 'Produce' | 'Dairy & Eggs' | 'Bakery' | 'Pantry' | 'Beverages' | 'Snacks' | 'Local Specialties';

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'admin';
  avatar?: string;
}

export interface Order {
  id: string;
  customerName: string;
  email: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  date: string;
  shippingAddress: string;
}

export type OrderStatus = 'pending' | 'preparing' | 'out_for_delivery' | 'delivered';

export interface CheckoutDetails {
  fullName: string;
  email: string;
  address: string;
  city: string;
  zip: string;
  cardNumber: string;
  expiry: string;
  cvc: string;
}