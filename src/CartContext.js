// src/CartContext.js
import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  // Lazy initializer reads from localStorage on first render only
  const [cartItems, setCartItems] = useState(() => {
    try {
      const stored = localStorage.getItem('eztechmovie_cart');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Every state change also writes to localStorage
  const saveCart = (updated) => {
    setCartItems(updated);
    localStorage.setItem('eztechmovie_cart', JSON.stringify(updated));
  };

  const addToCart = (item) => {
    const existing = cartItems.findIndex((c) => c.id === item.id);

    if (existing !== -1) {
      if (item.type === 'subscription') {
        // Subscriptions: one per type — reject with message
        return {
          success: false,
          message: `You already have "${item.service}" in your cart. Only one subscription of each type is allowed.`,
        };
      }
      // Accessories: increment quantity
      const updated = cartItems.map((c, i) =>
        i === existing ? { ...c, quantity: c.quantity + 1 } : c
      );
      saveCart(updated);
      return { success: true };
    }

    // Brand new item — add with quantity 1
    saveCart([...cartItems, { ...item, quantity: 1 }]);
    return { success: true };
  };

  const removeFromCart = (id) => {
    saveCart(cartItems.filter((c) => c.id !== id));
  };

  const updateQuantity = (id, delta) => {
    const updated = cartItems
      .map((c) => (c.id === id ? { ...c, quantity: c.quantity + delta } : c))
      .filter((c) => c.quantity > 0);
    saveCart(updated);
  };

  const clearCart = () => saveCart([]);

  const totalItems = cartItems.reduce((sum, c) => sum + c.quantity, 0);
  const totalPrice = cartItems.reduce((sum, c) => sum + c.price * c.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
