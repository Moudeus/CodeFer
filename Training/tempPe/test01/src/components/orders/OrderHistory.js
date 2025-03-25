import React, { useState, useEffect } from "react";
import { Card, Table, Badge, Form, Row, Col } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { UserAPI } from "../../api";
import { toast } from "react-toastify";

const OrderHistory = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("newest");
  const [filterDate, setFilterDate] = useState("all");

  useEffect(() => {
    loadOrders();
  }, [user]);

  const loadOrders = async () => {
    try {
      const data = await UserAPI.getUserOrders(user.id);
      setOrders(data);
    } catch (error) {
      console.error("Error loading orders:", error);
      toast.error("Failed to load order history");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const filterOrders = (orders) => {
    const now = new Date();
    const thirtyDaysAgo = new Date(now.setDate(now.getDate() - 30));
    const ninetyDaysAgo = new Date(now.setDate(now.getDate() - 90));

    switch (filterDate) {
      case "30days":
        return orders.filter((order) => new Date(order.date) >= thirtyDaysAgo);
      case "90days":
        return orders.filter((order) => new Date(order.date) >= ninetyDaysAgo);
      default:
        return orders;
    }
  };

  const sortOrders = (orders) => {
    return [...orders].sort((a, b) => {
      switch (sortBy) {
        case "oldest":
          return new Date(a.date) - new Date(b.date);
        case "highest":
          return b.total - a.total;
        case "lowest":
          return a.total - b.total;
        default: // newest
          return new Date(b.date) - new Date(a.date);
      }
    });
  };

  if (loading) {
    return <div>Loading orders...</div>;
  }

  const filteredAndSortedOrders = sortOrders(filterOrders(orders));

  return (
    <div>
      <h2 className="mb-4">Order History</h2>

      <Row className="mb-4">
        <Col md={6}>
          <Form.Group>
            <Form.Label>Sort By</Form.Label>
            <Form.Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="highest">Highest Amount</option>
              <option value="lowest">Lowest Amount</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Time Period</Form.Label>
            <Form.Select value={filterDate} onChange={(e) => setFilterDate(e.target.value)}>
              <option value="all">All Time</option>
              <option value="30days">Last 30 Days</option>
              <option value="90days">Last 90 Days</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      {filteredAndSortedOrders.length === 0 ? (
        <Card body>No orders found</Card>
      ) : (
        filteredAndSortedOrders.map((order) => (
          <Card key={order.id} className="mb-3">
            <Card.Header>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="mb-0">Order #{order.id}</h5>
                  <small className="text-muted">Placed on {formatDate(order.date)}</small>
                </div>
                <div className="text-end">
                  <h5 className="mb-0">${order.total.toLocaleString()}</h5>
                </div>
              </div>
            </Card.Header>
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.products.map((item, index) => (
                    <tr key={index}>
                      <td>{item.name}</td>
                      <td>{item.quantity}</td>
                      <td>${item.price.toLocaleString()}</td>
                      <td>${(item.price * item.quantity).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="3" className="text-end">
                      <strong>Total:</strong>
                    </td>
                    <td>
                      <strong>${order.total.toLocaleString()}</strong>
                    </td>
                  </tr>
                </tfoot>
              </Table>

              <div className="mt-3">
                <strong>Shipping Address:</strong>
                <p className="mb-0">{order.shipAddress}</p>
              </div>
            </Card.Body>
          </Card>
        ))
      )}
    </div>
  );
};

export default OrderHistory;
