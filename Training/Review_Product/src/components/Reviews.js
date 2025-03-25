import React, { useState, useEffect } from "react";
import axios from "axios";

const Reviews = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:9999/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date
      .toLocaleString("en-US", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      })
      .replace(",", "");
  };

  return (
    <div>
      <h2 className="mb-4">All Reviews</h2>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>ProductId</th>
              <th>Title</th>
              <th>Reviews</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.title}</td>
                <td>
                  <table className="table table-bordered mb-0">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Reviewer</th>
                        <th>Comment</th>
                        <th>Rating</th>
                      </tr>
                    </thead>
                    <tbody>
                      {product.reviews.map((review, index) => (
                        <tr key={index}>
                          <td>{formatDateTime(review.date)}</td>
                          <td>{review.reviewerName}</td>
                          <td>{review.comment}</td>
                          <td>{review.rating}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reviews;
