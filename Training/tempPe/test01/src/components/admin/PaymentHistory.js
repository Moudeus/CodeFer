import React, { useState, useEffect } from "react";
import { Table, Form, Row, Col, Card } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(true);
  const [filterUser, setFilterUser] = useState("all");
  const [sortBy, setSortBy] = useState("date-desc");
  const [dateRange, setDateRange] = useState("all");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [paymentsRes, usersRes, productsRes] = await Promise.all([
        axios.get("http://localhost:9999/paymentHistories"),
        axios.get("http://localhost:9999/accounts"),
        axios.get("http://localhost:9999/products"),
      ]);

      setPayments(paymentsRes.data);
      setUsers(usersRes.data);

      // Convert products array to object for easier lookup
      const productsMap = {};
      productsRes.data.forEach((product) => {
        productsMap[product.id] = product;
      });
      setProducts(productsMap);
    } catch (error) {
      console.error("Error fetching payment data:", error);
      toast.error("Failed to load payment history");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getUserName = (userId) => {
    const user = users.find((u) => u.id === userId);
    return user ? user.username : "Unknown User";
  };

  const getProductName = (productId) => {
    return products[productId]?.name || "Unknown Product";
  };

  const filterPayments = (payments) => {
    let filtered = [...payments];

    // Filter by user
    if (filterUser !== "all") {
      filtered = filtered.filter((payment) => payment.userId === parseInt(filterUser));
    }

    // Filter by date range
    const today = new Date();
    switch (dateRange) {
      case "7days":
        filtered = filtered.filter((payment) => {
          const paymentDate = new Date(payment.date);
          return today - paymentDate <= 7 * 24 * 60 * 60 * 1000;
        });
        break;
      case "30days":
        filtered = filtered.filter((payment) => {
          const paymentDate = new Date(payment.date);
          return today - paymentDate <= 30 * 24 * 60 * 60 * 1000;
        });
        break;
      default:
        break;
    }

    // Sort payments
    switch (sortBy) {
      case "date-asc":
        filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case "date-desc":
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case "amount-asc":
        filtered.sort((a, b) => a.total - b.total);
        break;
      case "amount-desc":
        filtered.sort((a, b) => b.total - a.total);
        break;
      default:
        break;
    }

    return filtered;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const filteredPayments = filterPayments(payments);

  return (
    <div>
      <h2 className="mb-4">Payment History</h2>

      <Row className="mb-4">
        <Col md={4}>
          <Form.Group>
            <Form.Label>Filter by User</Form.Label>
            <Form.Select value={filterUser} onChange={(e) => setFilterUser(e.target.value)}>
              <option value="all">All Users</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.username}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group>
            <Form.Label>Date Range</Form.Label>
            <Form.Select value={dateRange} onChange={(e) => setDateRange(e.target.value)}>
              <option value="all">All Time</option>
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group>
            <Form.Label>Sort By</Form.Label>
            <Form.Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="date-desc">Date (Newest First)</option>
              <option value="date-asc">Date (Oldest First)</option>
              <option value="amount-desc">Amount (Highest First)</option>
              <option value="amount-asc">Amount (Lowest First)</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      {filteredPayments.map((payment) => (
        <Card key={payment.id} className="mb-3">
          <Card.Header>
            <div className="d-flex justify-content-between">
              <div>
                <strong>Order ID:</strong> {payment.id}
                <br />
                <strong>User:</strong> {getUserName(payment.userId)}
              </div>
              <div className="text-end">
                <strong>Date:</strong> {formatDate(payment.date)}
                <br />
                <strong>Total:</strong> ${payment.total.toLocaleString()}
              </div>
            </div>
          </Card.Header>
          <Card.Body>
            <Table responsive size="sm">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {payment.products.map((item, index) => (
                  <tr key={index}>
                    <td>{getProductName(item.productId)}</td>
                    <td>{item.quantity}</td>
                    <td>${item.price.toLocaleString()}</td>
                    <td>${(item.price * item.quantity).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      ))}

      {filteredPayments.length === 0 && <Card body>No payment records found.</Card>}
    </div>
  );
};

export default PaymentHistory;
