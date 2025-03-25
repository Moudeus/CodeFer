import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:9999/orders");
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB"); // dd/MM/yyyy format
  };

  const formatProductList = (products) => {
    return products.map((p) => `${p.name} (x${p.quantity})`).join(", ");
  };

  const calculateTotalPrice = (products) => {
    return products.reduce((total, p) => total + p.price * p.quantity, 0).toFixed(2);
  };

  return (
    <div>
      <h2>Order Details</h2>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>OrderId</th>
            <th>OrderDate</th>
            <th>ShipAddress</th>
            <th>ProductList</th>
            <th>TotalPrice</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{formatDate(order.orderDate)}</td>
              <td>{order.shipAddress}</td>
              <td>{formatProductList(order.products)}</td>
              <td>${calculateTotalPrice(order.products)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Orders;
