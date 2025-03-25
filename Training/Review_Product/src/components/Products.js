import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [reviewForm, setReviewForm] = useState({
    reviewerName: "",
    comment: "",
    rating: 5,
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:9999/products");
      setProducts(response.data);

      // Extract unique categories
      const uniqueCategories = [...new Set(response.data.map((product) => product.category))];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to fetch products");
    }
  };

  const getAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };

  const handleAddReview = (product) => {
    setSelectedProduct(product);
    setReviewForm({
      reviewerName: "",
      comment: "",
      rating: 5,
    });
  };

  const validateForm = () => {
    if (!reviewForm.reviewerName.trim()) {
      toast.error("Reviewer name is required");
      return false;
    }
    if (!reviewForm.comment.trim()) {
      toast.error("Comment is required");
      return false;
    }
    return true;
  };

  const handleSubmitReview = async () => {
    if (!validateForm()) return;

    const newReview = {
      rating: parseInt(reviewForm.rating),
      comment: reviewForm.comment,
      date: new Date().toISOString(),
      reviewerName: reviewForm.reviewerName,
    };

    try {
      const updatedProduct = {
        ...selectedProduct,
        reviews: [...selectedProduct.reviews, newReview],
      };

      await axios.patch(`http://localhost:9999/products/${selectedProduct.id}`, updatedProduct);
      toast.success("Review saved successfully");

      // Update products list
      fetchProducts();

      // Clear form
      setSelectedProduct(null);
      setReviewForm({
        reviewerName: "",
        comment: "",
        rating: 5,
      });
    } catch (error) {
      console.error("Error saving review:", error);
      toast.error("Failed to save review");
    }
  };

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  return (
    <div>
      <div className="mb-4">
        <select className="form-select" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="row">
        <div className="col-md-8">
          <div className="row">
            {filteredProducts.map((product) => (
              <div key={product.id} className="col-md-6 mb-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{product.title}</h5>
                    <p className="card-text">
                      <strong>Category:</strong> {product.category}
                      <br />
                      <strong>Price:</strong> ${product.price}
                      <br />
                      <strong>Average Rate:</strong> {getAverageRating(product.reviews)}
                    </p>
                    <button className="btn btn-primary" onClick={() => handleAddReview(product)}>
                      Add New Review
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-md-4">
          {selectedProduct ? (
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Review Details</h5>
                <p className="card-text">
                  <strong>Product:</strong> {selectedProduct.title}
                </p>
                <div className="mb-3">
                  <label className="form-label">Reviewer Name*</label>
                  <input
                    type="text"
                    className="form-control"
                    value={reviewForm.reviewerName}
                    onChange={(e) =>
                      setReviewForm({
                        ...reviewForm,
                        reviewerName: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Comment*</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    value={reviewForm.comment}
                    onChange={(e) =>
                      setReviewForm({
                        ...reviewForm,
                        comment: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Rating</label>
                  <select
                    className="form-select"
                    value={reviewForm.rating}
                    onChange={(e) =>
                      setReviewForm({
                        ...reviewForm,
                        rating: e.target.value,
                      })
                    }>
                    {[5, 4, 3, 2, 1].map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                </div>
                <button className="btn btn-success w-100" onClick={handleSubmitReview}>
                  Send Review
                </button>
              </div>
            </div>
          ) : (
            <div className="card">
              <div className="card-body">
                <p className="text-center mb-0">Select a product to add a review</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
