import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Products from "./components/Products";
import Reviews from "./components/Reviews";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <div className="container mt-4">
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
          <div className="container-fluid">
            <span className="navbar-brand">Product Review App</span>
            <div className="navbar-nav">
              <Link to="/" className="nav-link">
                Products
              </Link>
              <Link to="/reviews" className="nav-link">
                Reviews
              </Link>
            </div>
          </div>
        </nav>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/reviews" element={<Reviews />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
