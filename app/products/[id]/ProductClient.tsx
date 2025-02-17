'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, ArrowLeft } from 'lucide-react';
import { getProduct } from '@/app/lib/api';
import { useCart } from '@/app/lib/cart';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  imageUrl: string;
}

export default function ProductClient({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const { addItem, items } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProduct(params.id);
        setProduct(data);
      } catch (error) {
        console.error('Failed to fetch product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addItem(product);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p>Product not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            EcoShop
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/products" className="text-foreground">
              Products
            </Link>
            <Link href="/cart" className="relative">
              <ShoppingBag className="w-6 h-6" />
              {items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground w-5 h-5 rounded-full flex items-center justify-center text-xs">
                  {items.length}
                </span>
              )}
            </Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Link
          href="/products"
          className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Products
        </Link>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="aspect-square relative overflow-hidden rounded-lg">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="object-cover w-full h-full"
            />
          </div>

          <div>
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
            <div className="text-3xl font-bold mb-6">${product.price}</div>

            <div className="prose prose-sm mb-6">
              <p className="text-muted-foreground whitespace-pre-line">
                {product.description}
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label htmlFor="quantity" className="font-medium">
                  Quantity:
                </label>
                <select
                  id="quantity"
                  className="px-4 py-2 border rounded-md bg-background"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                >
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full bg-primary text-primary-foreground px-8 py-3 rounded-md hover:bg-primary/90 transition-colors"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gradient-to-r from-teal-400 to-blue-500 text-white py-16 mt-20">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-4xl font-semibold mb-6 animate__animated animate__fadeIn">
            Stay Connected with Us
          </h3>
          <p className="text-xl mb-8 opacity-75 animate__animated animate__fadeIn animate__delay-1s">
            Join our newsletter and get the latest updates on new arrivals,
            discounts, and more!
          </p>

          <div className="flex justify-center gap-8 mb-8">
            <a
              href="#"
              className="text-white hover:text-primary transition-all transform hover:scale-110"
            >
              <i className="fab fa-facebook-square text-3xl"></i>
            </a>
            <a
              href="#"
              className="text-white hover:text-primary transition-all transform hover:scale-110"
            >
              <i className="fab fa-twitter-square text-3xl"></i>
            </a>
            <a
              href="#"
              className="text-white hover:text-primary transition-all transform hover:scale-110"
            >
              <i className="fab fa-instagram text-3xl"></i>
            </a>
            <a
              href="#"
              className="text-white hover:text-primary transition-all transform hover:scale-110"
            >
              <i className="fab fa-youtube text-3xl"></i>
            </a>
          </div>

          <div className="text-lg opacity-75 mb-6">
            <p>&copy; 2024 EcoShop. All Rights Reserved.</p>
            <p className="mt-2">
              <Link href="/privacy-policy" className="hover:underline">
                Privacy Policy
              </Link>
              &nbsp;|&nbsp;
              <Link href="/terms-of-service" className="hover:underline">
                Terms of Service
              </Link>
            </p>
          </div>

          <div className="text-sm opacity-50">
            <p className="mb-4">
              <Link href="/contact" className="hover:underline">
                Contact Us
              </Link>
            </p>
            <p>
              <Link href="/about" className="hover:underline">
                About Us
              </Link>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}