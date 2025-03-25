import axios from "axios";

const BASE_URL = "http://localhost:9999";

export const UserAPI = {
  // Authentication
  login: async (credentials) => {
    const response = await axios.get(`${BASE_URL}/accounts`);
    const user = response.data.find(
      (u) => u.email === credentials.email && u.password === credentials.password && u.status === "active"
    );
    return user;
  },

  register: async (userData) => {
    const response = await axios.post(`${BASE_URL}/accounts`, userData);
    return response.data;
  },

  // Cart operations
  getUserCart: async (userId) => {
    const response = await axios.get(`${BASE_URL}/carts`);
    return response.data.find((cart) => cart.user === userId);
  },

  updateCart: async (cartId, cartData) => {
    const response = await axios.put(`${BASE_URL}/carts/${cartId}`, cartData);
    return response.data;
  },

  createCart: async (cartData) => {
    const response = await axios.post(`${BASE_URL}/carts`, cartData);
    return response.data;
  },

  // Order history
  getUserOrders: async (userId) => {
    const response = await axios.get(`${BASE_URL}/paymentHistories`);
    return response.data.filter((order) => order.userId === userId);
  },

  // Reviews
  getUserReviews: async (userId) => {
    const response = await axios.get(`${BASE_URL}/reviews`);
    return response.data.filter((review) => review.userId === userId);
  },

  addReview: async (reviewData) => {
    const response = await axios.post(`${BASE_URL}/reviews`, reviewData);
    return response.data;
  },
};
