import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components
import NavBar from "./components/layout/NavBar";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

// Routes
import UserRoutes from "./routes/UserRoutes";
import ManagerRoutes from "./routes/ManagerRoutes";
import AdminRoutes from "./routes/AdminRoutes";

// Context
import { AuthProvider, useAuth } from "./contexts/AuthContext";

const AppContent = () => {
  const { user } = useAuth();

  return (
    <>
      <NavBar />
      <Container className="py-4">
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" replace />} />
          <Route path="/register" element={!user ? <Register /> : <Navigate to="/" replace />} />

          {/* Protected Routes */}
          {user ? (
            <>
              {/* User Routes */}
              <Route path="/*" element={<UserRoutes />} />

              {/* Manager Routes */}
              {(user.role === "manager" || user.role === "admin") && (
                <Route path="/manage/*" element={<ManagerRoutes />} />
              )}

              {/* Admin Routes */}
              {user.role === "admin" && <Route path="/admin/*" element={<AdminRoutes />} />}
            </>
          ) : (
            <Route path="*" element={<Navigate to="/login" replace />} />
          )}
        </Routes>
      </Container>
    </>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <ToastContainer />
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
