import React, { useState } from "react";
import { Table, Button, Card, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaTrash, FaMinus, FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import useCart from "../../hooks/useCart";
import { useAuth } from "../../contexts/AuthContext";
import { UserAPI } from "../../api";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, calculateTotal } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleQuantityChange = async (productId, currentQty, increment) => {
    const newQty = increment ? currentQty + 1 : currentQty - 1;
    if (newQty < 1) {
      await handleRemoveItem(productId);
      return;
    }
    await updateQuantity(productId, newQty);
  };

  const handleRemoveItem = async (productId) => {
    try {
      await removeFromCart(productId);
    } catch (error) {
      toast.error("Failed to remove item");
    }
  };

  const handleCheckout = async () => {
    if (!user) {
      toast.error("Please login to checkout");
      navigate("/login");
      return;
    }

    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setLoading(true);
    try {
      // Create payment record
      const orderData = {
        userId: user.id,
        products: cartItems,
        total: calculateTotal(),
        date: new Date().toISOString().split("T")[0],
      };

      await UserAPI.createOrder(orderData);
      await clearCart();
      toast.success("Order placed successfully!");
      navigate("/orders");
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-5">
        <h2>Your Cart is Empty</h2>
        <p>Add some products to your cart and they will show up here</p>
        <Button as={Link} to="/" variant="primary" className="mt-3">
          Continue Shopping
        </Button>
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-4">Shopping Cart</h2>
      <Row>
        <Col md={8}>
          <Card>
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.productId}>
                      <td>
                        <div className="d-flex align-items-center">
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            style={{ width: "50px", height: "50px", objectFit: "cover", marginRight: "10px" }}
                          />
                          <Link to={`/product/${item.productId}`} className="text-decoration-none">
                            {item.name}
                          </Link>
                        </div>
                      </td>
                      <td>${item.price.toLocaleString()}</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() => handleQuantityChange(item.productId, item.quantity, false)}>
                            <FaMinus />
                          </Button>
                          <span className="mx-2">{item.quantity}</span>
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() => handleQuantityChange(item.productId, item.quantity, true)}>
                            <FaPlus />
                          </Button>
                        </div>
                      </td>
                      <td>${(item.price * item.quantity).toLocaleString()}</td>
                      <td>
                        <Button variant="danger" size="sm" onClick={() => handleRemoveItem(item.productId)}>
                          <FaTrash />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Order Summary</Card.Title>
              <Table>
                <tbody>
                  <tr>
                    <td>Subtotal:</td>
                    <td className="text-end">${calculateTotal().toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td>Shipping:</td>
                    <td className="text-end">Free</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Total:</strong>
                    </td>
                    <td className="text-end">
                      <strong>${calculateTotal().toLocaleString()}</strong>
                    </td>
                  </tr>
                </tbody>
              </Table>

              <Button
                variant="success"
                className="w-100 mb-2"
                onClick={handleCheckout}
                disabled={loading || cartItems.length === 0}>
                {loading ? "Processing..." : "Proceed to Checkout"}
              </Button>

              <Button variant="outline-secondary" className="w-100" as={Link} to="/">
                Continue Shopping
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Cart;
