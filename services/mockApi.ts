import { Product, Order, OrderStatus } from '../types';
import { INITIAL_PRODUCTS } from '../constants';

// Simulating a database in memory
let productsDB = [...INITIAL_PRODUCTS];
let ordersDB: Order[] = [
  {
    id: 'ord-123',
    customerName: 'Jane Doe',
    email: 'jane@example.com',
    items: [
      { ...INITIAL_PRODUCTS[0], quantity: 1 },
      { ...INITIAL_PRODUCTS[2], quantity: 1 }
    ],
    total: 6.98,
    status: 'delivered',
    date: new Date().toISOString(),
    shippingAddress: '123 Main St'
  }
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  getProducts: async (category?: string, query?: string): Promise<Product[]> => {
    await delay(300);
    let result = productsDB;
    
    if (category) {
      result = result.filter(p => p.category === category);
    }
    
    if (query) {
      const q = query.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }
    
    return result;
  },

  getProductBySlug: async (slug: string): Promise<Product | undefined> => {
    await delay(200);
    return productsDB.find(p => p.slug === slug);
  },

  createOrder: async (order: Omit<Order, 'id' | 'date' | 'status'>): Promise<Order> => {
    await delay(800); // Simulate processing
    const newOrder: Order = {
      ...order,
      id: `ord-${Math.floor(Math.random() * 10000)}`,
      date: new Date().toISOString(),
      status: 'pending'
    };
    
    // Decrement stock
    order.items.forEach(item => {
      const productIndex = productsDB.findIndex(p => p.id === item.id);
      if (productIndex > -1) {
        productsDB[productIndex].stock -= item.quantity;
      }
    });
    
    ordersDB.unshift(newOrder);
    return newOrder;
  },

  getOrders: async (): Promise<Order[]> => {
    await delay(400);
    return ordersDB;
  },

  updateOrderStatus: async (id: string, status: OrderStatus): Promise<Order | undefined> => {
    await delay(300);
    const index = ordersDB.findIndex(o => o.id === id);
    if (index === -1) return undefined;
    
    ordersDB[index].status = status;
    return ordersDB[index];
  },

  // Admin function
  updateProductStock: async (id: string, stock: number) => {
    await delay(200);
    const index = productsDB.findIndex(p => p.id === id);
    if (index > -1) {
      productsDB[index].stock = stock;
    }
  }
};