import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { CartAPI } from "../api";
import { toast } from "react-toastify";

const useCart = () => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadCart();
    } else {
      setCartItems([]);
      setLoading(false);
    }
  }, [user]);

  const loadCart = async () => {
    try {
      const cart = await CartAPI.getUserCart(user.id);
      setCartItems(cart?.items || []);
    } catch (error) {
      console.error("Error loading cart:", error);
      toast.error("Failed to load cart");
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (product, quantity = 1) => {
    if (!user) {
      toast.error("Please login to add items to cart");
      return;
    }

    try {
      const updatedCart = await CartAPI.addToCart(user.id, product, quantity);
      setCartItems(updatedCart.items);
      toast.success("Item added to cart");
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add item to cart");
    }
  };

  const removeFromCart = async (productId) => {
    if (!user) return;

    try {
      const updatedCart = await CartAPI.removeFromCart(user.id, productId);
      setCartItems(updatedCart?.items || []);
      toast.success("Item removed from cart");
    } catch (error) {
      console.error("Error removing from cart:", error);
      toast.error("Failed to remove item from cart");
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (!user || quantity < 1) return;

    try {
      const updatedCart = await CartAPI.updateQuantity(user.id, productId, quantity);
      setCartItems(updatedCart.items);
    } catch (error) {
      console.error("Error updating quantity:", error);
      toast.error("Failed to update quantity");
    }
  };

  const clearCart = async () => {
    if (!user) return;

    try {
      await CartAPI.clearCart(user.id);
      setCartItems([]);
      toast.success("Cart cleared");
    } catch (error) {
      console.error("Error clearing cart:", error);
      toast.error("Failed to clear cart");
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };

  const getCartItemsCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  return {
    cartItems,
    cartItemsCount: getCartItemsCount(),
    loading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    calculateTotal,
  };
};

export default useCart;
