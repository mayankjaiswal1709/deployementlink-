export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  stock: number;
}

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation. Perfect for music lovers and professionals alike. Features include 30-hour battery life, premium sound quality, and comfortable fit.',
    price: 199.99,
    category: 'electronics',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
    stock: 50
  },
  {
    id: '2',
    name: 'Smart Watch',
    description: 'Feature-rich smartwatch with health tracking capabilities. Monitor your heart rate, sleep, and activity levels. Includes GPS tracking and water resistance.',
    price: 299.99,
    category: 'electronics',
    imageUrl: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800',
    stock: 30
  },
  {
    id: '3',
    name: 'Cotton T-Shirt',
    description: 'Comfortable cotton t-shirt in various colors. Made from 100% organic cotton, perfect for everyday wear. Available in multiple sizes.',
    price: 24.99,
    category: 'fashion',
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800',
    stock: 100
  },
  {
    id: '4',
    name: 'Desk Lamp',
    description: 'Modern LED desk lamp with adjustable brightness. Features touch controls and multiple color temperatures. Perfect for your home office.',
    price: 49.99,
    category: 'home',
    imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800',
    stock: 40
  },
  {
    id: '5',
    name: 'Bluetooth Speaker',
    description: 'Portable bluetooth speaker with premium sound quality. Waterproof design with 12-hour battery life. Perfect for outdoor activities.',
    price: 79.99,
    category: 'electronics',
    imageUrl: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800',
    stock: 60
  }
];