import axios from "axios";

const BASE_URL = "http://localhost:9999";

export const AdminAPI = {
  // Get all users
  getAllUsers: async () => {
    const response = await axios.get(`${BASE_URL}/accounts`);
    return response.data;
  },

  // Get all payment histories
  getAllPayments: async () => {
    const response = await axios.get(`${BASE_URL}/paymentHistories`);
    return response.data;
  },

  // Update user status
  updateUserStatus: async (userId, status) => {
    const response = await axios.patch(`${BASE_URL}/accounts/${userId}`, {
      status,
    });
    return response.data;
  },

  // Get dashboard statistics
  getDashboardStats: async () => {
    const [users, payments, products] = await Promise.all([
      axios.get(`${BASE_URL}/accounts`),
      axios.get(`${BASE_URL}/paymentHistories`),
      axios.get(`${BASE_URL}/products`),
    ]);

    return {
      users: users.data,
      payments: payments.data,
      products: products.data,
    };
  },

  // Get filtered payment history
  getFilteredPayments: async (filters) => {
    const response = await axios.get(`${BASE_URL}/paymentHistories`);
    let filteredData = response.data;

    if (filters.userId) {
      filteredData = filteredData.filter((payment) => payment.userId === filters.userId);
    }

    if (filters.dateFrom) {
      filteredData = filteredData.filter((payment) => new Date(payment.date) >= new Date(filters.dateFrom));
    }

    if (filters.dateTo) {
      filteredData = filteredData.filter((payment) => new Date(payment.date) <= new Date(filters.dateTo));
    }

    return filteredData;
  },
};
