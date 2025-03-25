import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminDashboard from "../components/admin/AdminDashboard";
import PaymentHistory from "../components/admin/PaymentHistory";
import ProtectedRoute from "../components/auth/ProtectedRoute";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute requiredRole="admin">
            <Routes>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="payments" element={<PaymentHistory />} />
            </Routes>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AdminRoutes;
