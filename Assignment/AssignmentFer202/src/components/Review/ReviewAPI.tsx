import axios from "axios";
import { IReview, IProduct, IPaymentHistory, IAccount } from "../../Interfaces/ProjectInterfaces";

const BASE_URL = "http://localhost:5000";

export const getProductById = async (productId: string): Promise<IProduct> => {
  const response = await axios.get(`${BASE_URL}/products/${productId}`);
  return response.data;
};

export const getUserById = async (userId: number): Promise<IAccount> => {
  const response = await axios.get(`${BASE_URL}/accounts/${userId}`);
  return response.data;
};

export const hasUserPurchased = async (userId: string | number, productId: string): Promise<boolean> => {
  const response = await axios.get<IPaymentHistory[]>(`${BASE_URL}/paymentHistories`);
  const histories = response.data;

  return histories.some(
    (history: IPaymentHistory) =>
      history.userId === Number(userId) && history.products.some((product) => product.id === productId)
  );
};

export const hasUserReviewed = async (userId: number, productId: string): Promise<boolean> => {
  const response = await axios.get<IReview[]>(`${BASE_URL}/reviews`);
  const reviews = response.data;

  return reviews.some((review) => review.userId === userId && review.productId === productId);
};

export interface AddReviewData {
  userId: number;
  productId: string;
  rating: number;
  comment: string;
  date: string;
}

export const addReview = async (productId: string, reviewData: AddReviewData): Promise<IReview> => {
  // Check if user has purchased the product
  const hasPurchased = await hasUserPurchased(reviewData.userId, productId);
  if (!hasPurchased) {
    throw new Error("You can only review products you have purchased");
  }

  // Check if user has already reviewed
  const hasReviewed = await hasUserReviewed(reviewData.userId, productId);
  if (hasReviewed) {
    throw new Error("You have already reviewed this product");
  }

  // Add review to reviews collection
  const reviewResponse = await axios.post<IReview>(`${BASE_URL}/reviews`, reviewData);
  const newReviewId = reviewResponse.data.id.toString(); // Convert number to string for product.reviews

  // Get current product
  const productResponse = await axios.get<IProduct>(`${BASE_URL}/products/${productId}`);
  const product = productResponse.data;

  // Update product's reviews array
  const reviews = product.reviews || [];
  reviews.push(newReviewId);

  // Update the product
  await axios.patch(`${BASE_URL}/products/${productId}`, { reviews });

  return reviewResponse.data;
};

export interface UpdateReviewData {
  rating: number;
  comment: string;
}

export const updateReview = async (reviewId: number, reviewData: UpdateReviewData): Promise<IReview> => {
  const response = await axios.patch<IReview>(`${BASE_URL}/reviews/${reviewId}`, {
    ...reviewData,
    date: new Date().toISOString(),
  });
  return response.data;
};

export const deleteReview = async (productId: string, reviewId: number): Promise<void> => {
  // Remove review from product's reviews array
  const productResponse = await axios.get<IProduct>(`${BASE_URL}/products/${productId}`);
  const product = productResponse.data;
  const updatedReviews = (product.reviews || []).filter((id: string) => id !== reviewId.toString());

  // Update product
  await axios.patch(`${BASE_URL}/products/${productId}`, {
    reviews: updatedReviews,
  });

  // Delete review
  await axios.delete(`${BASE_URL}/reviews/${reviewId}`);
};

export interface ReviewWithUser extends IReview {
  username: string;
}

export const getProductReviews = async (productId: string): Promise<ReviewWithUser[]> => {
  const product = await getProductById(productId);
  if (!product.reviews || product.reviews.length === 0) {
    return [];
  }

  const response = await axios.get<IReview[]>(`${BASE_URL}/reviews`);
  const allReviews = response.data;
  const productReviews = allReviews.filter((review: IReview) => product.reviews?.includes(review.id.toString()));

  // Get user info for each review
  const reviewsWithUserInfo = await Promise.all(
    productReviews.map(async (review: IReview) => {
      try {
        const userInfo = await getUserById(review.userId);
        return {
          ...review,
          username: userInfo.username,
        };
      } catch (error) {
        console.error(`Failed to get user info for userId: ${review.userId}`, error);
        return {
          ...review,
          username: "Unknown User",
        };
      }
    })
  );

  return reviewsWithUserInfo;
};
