"use client";

import React from "react";
import Link from "next/link";
import { ShoppingBag, Trash2, ArrowLeft } from "lucide-react";
import { useCart } from "@/app/lib/cart";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart();
  const router = useRouter();

  const handleCheckout = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/login");
        return;
      }

     
      const tokenData = JSON.parse(atob(token.split(".")[1]));
      const userId = tokenData.userId;

      const response = await fetch(
        "https://backendfullstack-6wsf.onrender.com/api/orders/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            userId: userId,
            cartItems: items.map((item) => ({
              productId: item.id,
              quantity: item.quantity, // make sure quantity is included
              price: item.price,
            })),
          }),
        }
      );

      if (response.ok) {
        clearCart();
        alert("Order placed successfully!");
      } else {
        const error = await response.json();
        console.error("Error creating order:", error); // Log the error to the console
        alert(error.message || "Error creating order");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Error processing checkout");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b shadow-md bg-gradient-to-r from-teal-500 to-blue-500 text-white">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <Link
            href="/"
            className="text-3xl font-extrabold text-white hover:text-primary transition-colors"
          >
            EcoShop
          </Link>
          <nav className="flex items-center gap-6">
            <Link
              href="/products"
              className="text-white hover:text-primary transition-colors"
            >
              Products
            </Link>
            <Link
              href="/cart"
              className="relative text-white hover:text-primary transition-colors"
            >
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
          Continue Shopping
        </Link>

        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

        {items.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <p className="text-xl text-muted-foreground">Your cart is empty</p>
            <Link
              href="/products"
              className="inline-block mt-4 text-primary hover:underline"
            >
              Start shopping
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 bg-card p-4 rounded-lg"
                >
                  <div className="w-24 h-24 flex-shrink-0">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-muted-foreground">
                      ${item.price.toFixed(2)}
                    </p>
                    <div className="flex items-center gap-4 mt-2">
                      <select
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(item.id, Number(e.target.value))
                        }
                        className="px-2 py-1 border rounded"
                      >
                        {[1, 2, 3, 4, 5].map((num) => (
                          <option key={num} value={num}>
                            {num}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-destructive hover:text-destructive/80"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-card p-6 rounded-lg h-fit">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full bg-primary text-primary-foreground px-8 py-3 rounded-md"
              >
                Proceed to Checkout
              </button>
            </div>
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
