import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Sport } from './RootStackParamList';

type CartContextType = {
  cartItems: Sport[];
  addToCart: (item: Sport) => void;
  removeFromCart: (id: number) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<Sport[]>([]);

  const addToCart = (item: Sport) => {
    setCartItems(prevItems => [...prevItems, item]);
  };

  const removeFromCart = (id: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
