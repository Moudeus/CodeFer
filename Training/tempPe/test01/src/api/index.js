import { UserAPI } from "./UserAPI";
import { ProductAPI } from "./ProductAPI";
import { AdminAPI } from "./AdminAPI";
import { CartAPI } from "./CartAPI";

// Export all APIs
export { UserAPI, ProductAPI, AdminAPI, CartAPI };

// Base URL for all API calls
export const API_BASE_URL = "http://localhost:9999";

// Common API response handling
export const handleApiError = (error) => {
  console.error("API Error:", error);
  if (error.response) {
    // Server responded with error
    return error.response.data.message || "Server error occurred";
  } else if (error.request) {
    // Request made but no response
    return "No response from server";
  } else {
    // Request setup error
    return "Error setting up request";
  }
};

// API endpoints
export const ENDPOINTS = {
  users: "/accounts",
  products: "/products",
  reviews: "/reviews",
  carts: "/carts",
  orders: "/paymentHistories",
};
