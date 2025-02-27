import React, { createContext, useContext, useState } from "react";

// Tạo CartContext
const CartContext = createContext({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
});

// CartProvider component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (dish) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === dish.id);
      if (existingItem) {
        return prevItems.map((item) => (item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item));
      }
      return [...prevItems, { ...dish, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>{children}</CartContext.Provider>
  );
};

// Hook tùy chỉnh để sử dụng CartContext
export const useCart = () => useContext(CartContext);
