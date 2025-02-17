import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      addItem: (item) => {
        set((state) => {
          const existingItem = state.items.find((i) => i.id === item.id);
          const items = existingItem
            ? state.items.map((i) =>
                i.id === item.id
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              )
            : [...state.items, { ...item, quantity: 1 }];
          return {
            items,
            total: items.reduce((sum, i) => sum + i.price * i.quantity, 0),
          };
        });
      },
      removeItem: (id) => {
        set((state) => {
          const items = state.items.filter((i) => i.id !== id);
          return {
            items,
            total: items.reduce((sum, i) => sum + i.price * i.quantity, 0),
          };
        });
      },
      updateQuantity: (id, quantity) => {
        set((state) => {
          const items = state.items.map((i) =>
            i.id === id ? { ...i, quantity } : i
          );
          return {
            items,
            total: items.reduce((sum, i) => sum + i.price * i.quantity, 0),
          };
        });
      },
      clearCart: () => set({ items: [], total: 0 }),
    }),
    {
      name: 'cart-storage',
    }
  )
);