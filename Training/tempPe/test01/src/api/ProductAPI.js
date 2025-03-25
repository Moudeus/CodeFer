import axios from "axios";

const BASE_URL = "http://localhost:9999";

export const ProductAPI = {
  // Get all products
  getAllProducts: async () => {
    const response = await axios.get(`${BASE_URL}/products`);
    return response.data;
  },

  // Get single product
  getProductById: async (productId) => {
    const response = await axios.get(`${BASE_URL}/products/${productId}`);
    return response.data;
  },

  // Add review to product
  addReview: async (productId, reviewData) => {
    // First, add the review to reviews collection
    const reviewResponse = await axios.post(`${BASE_URL}/reviews`, reviewData);
    const newReviewId = reviewResponse.data.id;

    // Then get the current product
    const productResponse = await axios.get(`${BASE_URL}/products/${productId}`);
    const product = productResponse.data;

    // Update product's reviews array
    const reviews = product.reviews || [];
    reviews.push(newReviewId);

    // Update the product with new review
    await axios.patch(`${BASE_URL}/products/${productId}`, { reviews });

    return reviewResponse.data;
  },

  // Get product reviews
  getProductReviews: async (productId) => {
    const product = await ProductAPI.getProductById(productId);
    if (!product.reviews || product.reviews.length === 0) {
      return [];
    }

    const response = await axios.get(`${BASE_URL}/reviews`);
    const allReviews = response.data;
    return allReviews.filter((review) => product.reviews.includes(review.id));
  },

  // Add new product (Manager)
  addProduct: async (productData) => {
    const response = await axios.post(`${BASE_URL}/products`, {
      ...productData,
      reviews: [],
    });
    return response.data;
  },

  // Update product (Manager)
  updateProduct: async (productId, productData) => {
    const response = await axios.put(`${BASE_URL}/products/${productId}`, productData);
    return response.data;
  },

  // Delete product (Manager)
  deleteProduct: async (productId) => {
    await axios.delete(`${BASE_URL}/products/${productId}`);
  },
};
