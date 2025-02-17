"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { getProducts } from "@/app/lib/api";
import { useCart } from "@/app/lib/cart";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  imageUrl: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const { addItem, items } = useCart();

  // Fetch products from both MongoDB and Be Commings API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch products from your existing API (MongoDB)
        const data = await getProducts({ category, search });

        // Fetch products from Be Commings API (or other source)
        const beCommingsData = await fetchBeCommingsProducts();

        // Combine the data from both sources
        const allProducts = [...data.products, ...beCommingsData];

        setProducts(allProducts); // Set the combined products to state
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, search]);

  // Function to fetch products from Be Commings API
  const fetchBeCommingsProducts = async () => {
    try {
      // Replace this with the actual URL or logic to fetch products from Be Commings
      const response = await fetch(
        "https://backendfullstack-6wsf.onrender.com/api/products"
      ); // Example URL
      const data = await response.json();
      return data.products; // Assuming the products are inside the 'products' array
    } catch (error) {
      console.error("Failed to fetch products from Be Commings:", error);
      return []; // Return empty array in case of error
    }
  };

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
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Our Products</h1>
          <div className="flex gap-4">
            <select
              className="px-4 py-2 border rounded-md bg-background"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="electronics">Electronics</option>
              <option value="fashion">Fashion</option>
              <option value="home">Home & Living</option>
            </select>
            <input
              type="text"
              placeholder="Search products..."
              className="px-4 py-2 border rounded-md"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <Card key={product.id} className="transition-transform hover:scale-[1.02]">
                <CardHeader>
                  <div className="aspect-square relative overflow-hidden">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <CardTitle>{product.name}</CardTitle>
                  <CardDescription>{product.description}</CardDescription>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <span className="text-xl font-bold">${product.price}</span>
                  <button
                    onClick={() => addItem(product)}
                    className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
                  >
                    Add to Cart
                  </button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </main>

      <footer className="bg-muted mt-20 py-12">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2024 EcoShop. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
