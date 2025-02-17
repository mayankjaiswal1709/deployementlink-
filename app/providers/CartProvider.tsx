'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useCart } from '../lib/cart';

const CartContext = createContext<ReturnType<typeof useCart> | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const cart = useCart();
  return <CartContext.Provider value={cart}>{children}</CartContext.Provider>;
}

export function useCartContext() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCartContext must be used within a CartProvider');
  }
  return context;
}