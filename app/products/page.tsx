"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { getProducts } from "@/app/lib/api";
import { useCart } from "@/app/lib/cart";

// Simulate user authentication (replace with actual auth logic)
const useAuth = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Replace with actual logic to fetch user details (e.g., from context or API)
    const loggedUser = localStorage.getItem("user"); // Simulating login with localStorage
    if (loggedUser) {
      setUser(JSON.parse(loggedUser)); // Set user from localStorage
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("user"); // Remove user from localStorage
    setUser(null); // Clear user state and log out
  };

  return { user, logout };
};

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
  const { user, logout } = useAuth(); // Get user and logout function from the hook

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts({ category, search });
        setProducts(data.products);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, search]);

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
            {user ? (
              // If logged in, show user name and logout button
              <div className="flex items-center gap-4">
                <span className="text-lg font-medium">{user.name}</span>
                <button
                  onClick={logout}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >
                  Logout
                </button>
              </div>
            ) : (
              // If not logged in, show login link
              <Link href="/login" className="text-foreground">
                Login
              </Link>
            )}
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
              <div
                key={product.id}
                className="bg-card rounded-lg overflow-hidden shadow-md transition-transform hover:scale-[1.02]"
              >
                <Link href={`/products/${product.id}`}>
                  <div className="aspect-square relative overflow-hidden">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </Link>
                <div className="p-6">
                  <Link href={`/products/${product.id}`}>
                    <h3 className="text-lg font-semibold mb-2">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold">${product.price}</span>
                    <button
                      onClick={() => addItem(product)}
                      className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
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
