import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "react-toastify";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, checkRole, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>;
  }

  // If user is not logged in, redirect to login
  if (!user) {
    toast.error("Please login to access this page");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If a specific role is required, check for it
  if (requiredRole && !checkRole(requiredRole)) {
    toast.error("You do not have permission to access this page");
    return <Navigate to="/" replace />;
  }

  // If user is logged in and has required role (if any), render the protected content
  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  requiredRole: PropTypes.oneOf(["admin", "manager", "user"]),
};

export default ProtectedRoute;
