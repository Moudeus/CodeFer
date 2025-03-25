import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Login";
import CarManagement from "./components/CarManagement";
import CarDetail from "./components/CarDetail";

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Container className="py-4">
        <Routes>
          <Route path="/" element={!user ? <Login setUser={setUser} /> : <Navigate to="/cars" replace />} />
          <Route path="/cars" element={user ? <CarManagement user={user} /> : <Navigate to="/" replace />} />
          <Route path="/cars/:id" element={user ? <CarDetail user={user} /> : <Navigate to="/" replace />} />
          <Route path="*" element={<h1>404: Page Not Found</h1>} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
