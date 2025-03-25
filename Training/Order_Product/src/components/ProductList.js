import React, { useState, useEffect } from "react";
import { Table, Form, Button, Row, Col, Alert } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProductList = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cartItems, setCartItems] = useState([]);
  const [shipAddress, setShipAddress] = useState("");

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
    }
  };

  const getAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handlePlaceOrder = async () => {
    if (!shipAddress.trim()) {
      toast.error("Please enter a shipping address");
      return;
    }

    try {
      const orderData = {
        orderDate: new Date().toISOString(),
        products: cartItems.map((item) => ({
          id: item.id,
          name: item.title,
          price: item.price,
          quantity: item.quantity,
        })),
        shipAddress,
      };

      await axios.post("http://localhost:9999/orders", orderData);
      toast.success("Order placed successfully!");
      setCartItems([]);
      setShipAddress("");
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Failed to place order. Please try again.");
    }
  };

  const filteredProducts =
    selectedCategory === "All" ? products : products.filter((product) => product.category === selectedCategory);

  return (
    <>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "1rem" }}>
        <Button size="sm" variant="outline-primary" onClick={() => navigate("/orders")}>
          View Orders
        </Button>
      </div>

      <Row>
        <Col md={8}>
          <Form.Group className="mb-3">
            <Form.Label>Filter by Category:</Form.Label>
            <Form.Select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
              <option value="All">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Price</th>
                <th>Rate</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td>{product.title}</td>
                  <td>{product.category.charAt(0).toUpperCase() + product.category.slice(1)}</td>
                  <td>${product.price.toFixed(2)}</td>
                  <td>{getAverageRating(product.reviews)}</td>
                  <td>
                    <Button variant="primary" onClick={() => addToCart(product)}>
                      Add To Cart
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>

        <Col md={4}>
          <div className="position-sticky" style={{ top: "1rem" }}>
            <h2>Shopping Cart</h2>
            {cartItems.length === 0 ? (
              <Alert variant="info">Your cart is empty</Alert>
            ) : (
              <>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Qty</th>
                      <th>Price</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr key={item.id}>
                        <td>{item.title}</td>
                        <td>{item.quantity}</td>
                        <td>${(item.price * item.quantity).toFixed(2)}</td>
                        <td>
                          <Button variant="danger" size="sm" onClick={() => removeFromCart(item.id)}>
                            Remove
                          </Button>
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td colSpan="2">
                        <strong>Total:</strong>
                      </td>
                      <td colSpan="2">
                        <strong>${calculateTotal()}</strong>
                      </td>
                    </tr>
                  </tbody>
                </Table>

                <Form.Group className="mb-3">
                  <Form.Label>Shipping Address</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={shipAddress}
                    onChange={(e) => setShipAddress(e.target.value)}
                    placeholder="Enter your shipping address"
                  />
                </Form.Group>

                <Button variant="success" className="w-100" onClick={handlePlaceOrder} disabled={!shipAddress.trim()}>
                  Place Order
                </Button>
              </>
            )}
          </div>
        </Col>
      </Row>
    </>
  );
};

export default ProductList;
