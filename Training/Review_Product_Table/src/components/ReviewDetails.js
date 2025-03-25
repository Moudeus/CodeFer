import React, { useState, useEffect } from "react";
import { Table, Form, Button, Alert } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";

const ReviewDetails = ({ product, onClearReviews, onReviewAdded }) => {
  const [localReviews, setLocalReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    reviewerName: "",
    comment: "",
    rating: 5,
  });

  useEffect(() => {
    if (product && product.reviews) {
      setLocalReviews(product.reviews);
    }
  }, [product]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!newReview.reviewerName.trim()) {
      toast.error("Reviewer name is required!");
      return false;
    }
    if (!newReview.comment.trim()) {
      toast.error("Comment is required!");
      return false;
    }
    return true;
  };

  const handleSubmitReview = async () => {
    if (!validateForm()) return;

    const review = {
      ...newReview,
      date: new Date().toISOString(),
      rating: parseInt(newReview.rating),
    };

    try {
      const updatedProduct = {
        ...product,
        reviews: [...localReviews, review],
      };

      await axios.patch(`http://localhost:9999/products/${product.id}`, updatedProduct);
      toast.success("Review added successfully!");

      // Update local state immediately
      setLocalReviews((prev) => [...prev, review]);

      // Reset form
      setNewReview({
        reviewerName: "",
        comment: "",
        rating: 5,
      });

      // Notify parent component
      if (onReviewAdded) {
        onReviewAdded(updatedProduct);
      }
    } catch (error) {
      console.error("Error adding review:", error);
      toast.error("Failed to add review");
    }
  };

  if (!product) return null;

  return (
    <div>
      <div className="mb-4 p-3 border rounded">
        <h4>Product Information</h4>
        <p>
          <strong>ID:</strong> {product.id}
        </p>
        <p>
          <strong>Title:</strong> {product.title}
        </p>
        <p>
          <strong>Category:</strong> {product.category}
        </p>
        <p>
          <strong>Price:</strong> ${product.price.toFixed(2)}
        </p>
      </div>

      <div className="mb-4">
        <h4>Add a new Review</h4>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Reviewer Name*</Form.Label>
            <Form.Control
              type="text"
              name="reviewerName"
              value={newReview.reviewerName}
              onChange={handleInputChange}
              placeholder="Enter your name"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Comment*</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="comment"
              value={newReview.comment}
              onChange={handleInputChange}
              placeholder="Enter your review"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Rating</Form.Label>
            <Form.Select name="rating" value={newReview.rating} onChange={handleInputChange}>
              {[5, 4, 3, 2, 1].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Button variant="primary" onClick={handleSubmitReview}>
            Send Review
          </Button>
          <Button variant="secondary" className="ms-2" onClick={onClearReviews}>
            Clear Reviews
          </Button>
        </Form>
      </div>

      <div>
        <h4>Reviews</h4>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Date</th>
              <th>Reviewer</th>
              <th>Comment</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            {localReviews.map((review, index) => (
              <tr key={index}>
                <td>{new Date(review.date).toLocaleString()}</td>
                <td>{review.reviewerName}</td>
                <td>{review.comment}</td>
                <td>{review.rating}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default ReviewDetails;
