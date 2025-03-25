import React from "react";
import { Routes, Route } from "react-router-dom";
import ProductList from "../components/products/ProductList";
import ProductDetail from "../components/products/ProductDetail";
import Cart from "../components/cart/Cart";
import OrderHistory from "../components/orders/OrderHistory";

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ProductList />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/orders" element={<OrderHistory />} />
    </Routes>
  );
};

export default UserRoutes;
