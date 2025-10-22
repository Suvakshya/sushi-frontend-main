"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface MenuItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
  image: string;
  is_available: boolean;
  created_at: string;
  updated_at: string;
}

interface CartItem extends MenuItem {
  cartQuantity: number;
}

interface CartContextType {
  cart: CartItem[];
  cartCount: number;
  addToCart: (item: MenuItem) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, newQuantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartCount, setCartCount] = useState(0);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('sushiCart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart) as CartItem[];
        setCart(parsedCart);
        updateCartCount(parsedCart);
      } catch (error) {
        console.error('Error parsing cart from localStorage:', error);
      }
    }
  }, []);

  const updateCartCount = (cartItems: CartItem[]) => {
    const count = cartItems.reduce((total, item) => total + item.cartQuantity, 0);
    setCartCount(count);
  };

  const addToCart = (item: MenuItem) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem._id === item._id);
      let newCart: CartItem[];

      if (existingItem) {
        newCart = prevCart.map(cartItem =>
          cartItem._id === item._id
            ? { ...cartItem, cartQuantity: cartItem.cartQuantity + 1 }
            : cartItem
        );
      } else {
        newCart = [...prevCart, { ...item, cartQuantity: 1 }];
      }

      localStorage.setItem('sushiCart', JSON.stringify(newCart));
      updateCartCount(newCart);
      return newCart;
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart(prevCart => {
      const newCart = prevCart.filter(item => item._id !== itemId);
      localStorage.setItem('sushiCart', JSON.stringify(newCart));
      updateCartCount(newCart);
      return newCart;
    });
  };

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(itemId);
      return;
    }

    setCart(prevCart => {
      const newCart = prevCart.map(item =>
        item._id === itemId
          ? { ...item, cartQuantity: newQuantity }
          : item
      );
      localStorage.setItem('sushiCart', JSON.stringify(newCart));
      updateCartCount(newCart);
      return newCart;
    });
  };

  const clearCart = () => {
    setCart([]);
    setCartCount(0);
    localStorage.removeItem('sushiCart');
  };

  const getCartTotal = (): number => {
    return cart.reduce((total, item) => total + (item.price * item.cartQuantity), 0);
  };

  const value: CartContextType = {
    cart,
    cartCount,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};