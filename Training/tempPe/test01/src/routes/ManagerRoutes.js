import React from "react";
import { Routes, Route } from "react-router-dom";
import ProductManagement from "../components/manager/ProductManagement";
import ProtectedRoute from "../components/auth/ProtectedRoute";

const ManagerRoutes = () => {
  return (
    <Routes>
      <Route
        path="/manage/*"
        element={
          <ProtectedRoute requiredRole="manager">
            <Routes>
              <Route path="products" element={<ProductManagement />} />
            </Routes>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default ManagerRoutes;
