
import { createContext, useContext, useState, ReactNode } from 'react';
import { MenuItem, OrderItem } from '@/types';

interface CartContextType {
  items: OrderItem[];
  addToCart: (menuItem: MenuItem, quantity: number) => void;
  removeFromCart: (menuItemId: string) => void;
  updateQuantity: (menuItemId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<OrderItem[]>([]);

  const addToCart = (menuItem: MenuItem, quantity: number) => {
    setItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(item => item.menuItemId === menuItem.id);
      
      if (existingItemIndex >= 0) {
        const newItems = [...prevItems];
        newItems[existingItemIndex].quantity += quantity;
        return newItems;
      } else {
        return [...prevItems, {
          menuItemId: menuItem.id,
          name: menuItem.name,
          price: menuItem.price,
          quantity
        }];
      }
    });
  };

  const removeFromCart = (menuItemId: string) => {
    setItems((prevItems) => prevItems.filter(item => item.menuItemId !== menuItemId));
  };

  const updateQuantity = (menuItemId: string, quantity: number) => {
    setItems((prevItems) => 
      prevItems.map(item => 
        item.menuItemId === menuItemId ? { ...item, quantity } : item
      ).filter(item => item.quantity > 0)
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      total,
      itemCount
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
