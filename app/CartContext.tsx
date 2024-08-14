import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Sport } from '../RootStackParamList';

type CartContextType = {
  cart: Sport[];
  addToCart: (sport: Sport) => void;
  removeFromCart: (id: number) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Sport[]>([]);

  const addToCart = (sport: Sport) => {
    setCart((prevCart) => [...prevCart, sport]);
  };

  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
