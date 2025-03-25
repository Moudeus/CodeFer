import React, { useState, useEffect } from "react";
import { Table, Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import ReviewDetails from "./ReviewDetails";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:9999/products");
      setProducts(response.data || []);
      if (selectedProduct) {
        const updatedProduct = response.data.find((p) => p.id === selectedProduct.id);
        if (updatedProduct) {
          setSelectedProduct(updatedProduct);
        }
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
  };

  const clearReviews = () => {
    setSelectedProduct(null);
  };

  const handleReviewAdded = (updatedProduct) => {
    setProducts((prevProducts) => prevProducts.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)));
    setSelectedProduct(updatedProduct);
  };

  const filteredProducts = products.filter((product) => product.title.toLowerCase().includes(searchTerm.toLowerCase()));

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="row">
      <div className="col-md-6">
        <div className="mb-3">
          <Form.Control
            type="text"
            placeholder="Search by product title..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Category</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.title}</td>
                <td>{product.category}</td>
                <td>${product.price.toFixed(2)}</td>
                <td>
                  <Button variant="primary" size="sm" onClick={() => handleViewDetails(product)}>
                    View Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <div className="col-md-6">
        <h3>Reviews details</h3>
        {selectedProduct ? (
          <ReviewDetails product={selectedProduct} onClearReviews={clearReviews} onReviewAdded={handleReviewAdded} />
        ) : (
          <Alert variant="info">Please select a product!</Alert>
        )}
      </div>
    </div>
  );
};

export default ProductList;
