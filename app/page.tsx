"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ShoppingCart, Package } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token && user) {
      setIsLoggedIn(true);
      setUserName(user);
    }
  }, []);


  const handleShopNow = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      router.push("/products");
    }
  };


  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUserName("");
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-6 py-8 flex justify-between items-center">
          <Link href="/" className="text-4xl font-bold text-primary">
            EcoShop
          </Link>
          <nav className="flex items-center gap-8 text-lg font-semibold">
            <Link
              href="/products"
              className="text-muted-foreground hover:text-primary transition-all"
            >
              Products
            </Link>
            <Link href="/cart" className="relative">
              <ShoppingCart className="w-8 h-8 text-muted-foreground hover:text-primary transition-all" />
            </Link>

            {/* Conditional rendering for logged-in state */}
            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                <span className="text-muted-foreground">
                  Welcome, {userName}!
                </span>
                <button
                  onClick={handleLogout}
                  className="text-primary hover:text-red-600 transition-all"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex gap-4">
                <Link
                  href="/login"
                  className="text-muted-foreground hover:text-primary transition-all"
                >
                  Login
                </Link>
              </div>
            )}
          </nav>
        </div>
      </header>

      <main>
        <section className="py-20 bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 text-white text-center">
          <div className="container mx-auto px-6">
            <h1 className="text-5xl font-extrabold mb-6 animate__animated animate__fadeIn">
              Welcome to EcoShop
            </h1>
            <p className="text-xl mb-8 animate__animated animate__fadeIn animate__delay-1s">
              Discover amazing products at unbeatable prices
            </p>
            <button
              onClick={handleShopNow}
              className="px-10 py-4 bg-primary text-white rounded-full shadow-lg hover:bg-primary/90 transition-all transform hover:scale-105"
            >
              Shop Now
            </button>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-semibold text-center mb-12">
              Featured Categories
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {["Electronics", "Fashion", "Home & Living"].map((category) => (
                <div
                  key={category}
                  className="bg-card rounded-lg p-6 text-center shadow-xl transition-transform hover:scale-105 hover:shadow-2xl"
                >
                  <Package className="w-16 h-16 mx-auto mb-6 text-primary" />
                  <h3 className="text-2xl font-semibold text-primary mb-3">
                    {category}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Explore our {category.toLowerCase()} collection
                  </p>
                  <Link
                    href={`/products?category=${category.toLowerCase()}`}
                    className="text-primary hover:underline transition-all"
                  >
                    View Products
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
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
