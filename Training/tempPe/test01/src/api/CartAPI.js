import axios from "axios";

const BASE_URL = "http://localhost:9999";

export const CartAPI = {
  // Get user's cart
  getUserCart: async (userId) => {
    try {
      const response = await axios.get(`${BASE_URL}/carts`);
      return response.data.find((cart) => cart.user === userId) || null;
    } catch (error) {
      console.error("Error getting user cart:", error);
      throw error;
    }
  },

  // Create new cart
  createCart: async (userId, items = []) => {
    try {
      const cartData = {
        user: userId,
        items: items,
        total: 0,
      };
      const response = await axios.post(`${BASE_URL}/carts`, cartData);
      return response.data;
    } catch (error) {
      console.error("Error creating cart:", error);
      throw error;
    }
  },

  // Update cart
  updateCart: async (cartId, cartData) => {
    try {
      const response = await axios.put(`${BASE_URL}/carts/${cartId}`, cartData);
      return response.data;
    } catch (error) {
      console.error("Error updating cart:", error);
      throw error;
    }
  },

  // Add item to cart
  addToCart: async (userId, product, quantity = 1) => {
    try {
      let cart = await CartAPI.getUserCart(userId);

      if (!cart) {
        cart = await CartAPI.createCart(userId);
      }

      const existingItem = cart.items.find((item) => item.productId === product.id);

      if (existingItem) {
        cart.items = cart.items.map((item) =>
          item.productId === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        cart.items.push({
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity: quantity,
          imageUrl: product.imageUrl,
        });
      }

      // Update cart total
      cart.total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

      return await CartAPI.updateCart(cart.id, cart);
    } catch (error) {
      console.error("Error adding to cart:", error);
      throw error;
    }
  },

  // Remove item from cart
  removeFromCart: async (userId, productId) => {
    try {
      const cart = await CartAPI.getUserCart(userId);
      if (!cart) return null;

      cart.items = cart.items.filter((item) => item.productId !== productId);
      cart.total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

      return await CartAPI.updateCart(cart.id, cart);
    } catch (error) {
      console.error("Error removing from cart:", error);
      throw error;
    }
  },

  // Update item quantity
  updateQuantity: async (userId, productId, quantity) => {
    try {
      const cart = await CartAPI.getUserCart(userId);
      if (!cart) return null;

      cart.items = cart.items.map((item) => (item.productId === productId ? { ...item, quantity: quantity } : item));

      cart.total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

      return await CartAPI.updateCart(cart.id, cart);
    } catch (error) {
      console.error("Error updating quantity:", error);
      throw error;
    }
  },

  // Clear cart
  clearCart: async (userId) => {
    try {
      const cart = await CartAPI.getUserCart(userId);
      if (!cart) return null;

      cart.items = [];
      cart.total = 0;

      return await CartAPI.updateCart(cart.id, cart);
    } catch (error) {
      console.error("Error clearing cart:", error);
      throw error;
    }
  },
};
