import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import ProductList from "./components/ProductList";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <div className="container mt-4">
        <ToastContainer />
        <div className="row">
          <div className="col-md-12">
            <h1 className="mb-4">Product Review System</h1>
            <ProductList />
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
