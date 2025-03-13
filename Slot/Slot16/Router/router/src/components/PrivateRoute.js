import React from "react";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  if (!isLoggedIn) {
    // Redirect to login if not logged in
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default PrivateRoute;
