import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Row, Col, Card, Button, Form } from "react-bootstrap";
import { FaStar, FaPlus, FaMinus } from "react-icons/fa";
import { toast } from "react-toastify";
import { ProductAPI } from "../../api";
import useCart from "../../hooks/useCart";
import { useAuth } from "../../contexts/AuthContext";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: "",
  });

  useEffect(() => {
    loadProductAndReviews();
  }, [id]);

  const loadProductAndReviews = async () => {
    try {
      const productData = await ProductAPI.getProductById(id);
      if (!productData) {
        toast.error("Product not found");
        navigate("/");
        return;
      }
      setProduct(productData);

      const reviewsData = await ProductAPI.getProductReviews(id);
      setReviews(reviewsData);
    } catch (error) {
      console.error("Error loading product:", error);
      toast.error("Failed to load product details");
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!user) {
      toast.error("Please login to add items to cart");
      navigate("/login");
      return;
    }

    try {
      await addToCart(product, quantity);
      toast.success(`Added ${quantity} item(s) to cart`);
    } catch (error) {
      toast.error("Failed to add to cart");
    }
  };

  const handleQuantityChange = (increment) => {
    setQuantity((prev) => {
      const newQty = increment ? prev + 1 : prev - 1;
      return Math.max(1, newQty);
    });
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please login to submit a review");
      return;
    }

    if (!newReview.comment.trim()) {
      toast.error("Please write a review comment");
      return;
    }

    try {
      const reviewData = {
        userId: user.id,
        productId: product.id,
        rating: parseInt(newReview.rating),
        comment: newReview.comment,
        date: new Date().toISOString().split("T")[0],
      };

      await ProductAPI.addReview(product.id, reviewData);
      toast.success("Review submitted successfully");

      // Reload reviews
      loadProductAndReviews();

      // Reset form
      setNewReview({
        rating: 5,
        comment: "",
      });
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Failed to submit review");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const getAverageRating = () => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };

  return (
    <div>
      <Row>
        <Col md={6}>
          <img
            src={product.imageUrl}
            alt={product.name}
            className="img-fluid rounded"
            style={{ maxHeight: "400px", width: "100%", objectFit: "cover" }}
          />
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title className="h2">{product.name}</Card.Title>
              <div className="mb-3">
                <h4 className="text-primary">${product.price.toLocaleString()}</h4>
                <div className="d-flex align-items-center mb-2">
                  {[...Array(5)].map((_, index) => (
                    <FaStar key={index} className={index < getAverageRating() ? "text-warning" : "text-muted"} />
                  ))}
                  <span className="ms-2">({reviews.length} reviews)</span>
                </div>
              </div>

              <p>{product.description}</p>

              <div className="mb-3">
                <div className="d-flex align-items-center">
                  <Button
                    variant="outline-secondary"
                    onClick={() => handleQuantityChange(false)}
                    disabled={quantity <= 1}>
                    <FaMinus />
                  </Button>
                  <span className="mx-3">{quantity}</span>
                  <Button variant="outline-secondary" onClick={() => handleQuantityChange(true)}>
                    <FaPlus />
                  </Button>
                </div>
              </div>

              <Button variant="primary" className="w-100" onClick={handleAddToCart}>
                Add to Cart
              </Button>
            </Card.Body>
          </Card>

          {user && (
            <Card className="mt-3">
              <Card.Body>
                <Card.Title>Write a Review</Card.Title>
                <Form onSubmit={handleReviewSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Rating</Form.Label>
                    <Form.Select
                      value={newReview.rating}
                      onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}>
                      {[5, 4, 3, 2, 1].map((num) => (
                        <option key={num} value={num}>
                          {num} Stars
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Comment</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={newReview.comment}
                      onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                      required
                    />
                  </Form.Group>

                  <Button type="submit" variant="primary">
                    Submit Review
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>

      <Card className="mt-4">
        <Card.Body>
          <Card.Title>Reviews</Card.Title>
          {reviews.length === 0 ? (
            <p>No reviews yet. Be the first to review this product!</p>
          ) : (
            reviews.map((review, index) => (
              <div key={index} className="border-bottom mb-3 pb-3">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className={i < review.rating ? "text-warning" : "text-muted"} />
                    ))}
                  </div>
                  <small className="text-muted">{new Date(review.date).toLocaleDateString()}</small>
                </div>
                <p className="mt-2 mb-0">{review.comment}</p>
              </div>
            ))
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProductDetail;
