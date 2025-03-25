import React, { useState } from "react";
import { Form, Button, Modal, Alert } from "react-bootstrap";
import PropTypes from "prop-types";
import axios from "axios";

const Login = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("http://localhost:9999/UserAccounts");
      const users = response.data;
      const user = users.find((u) => u.username === username && u.password === password && u.status === "active");

      if (user) {
        setShowSuccessModal(true);
        setTimeout(() => {
          setUser(user);
        }, 1500);
      } else {
        setShowError(true);
        setTimeout(() => setShowError(false), 3000);
      }
    } catch (error) {
      console.error("Login error:", error);
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <div className="p-4 border rounded shadow" style={{ width: "100%", maxWidth: "400px" }}>
        <h2 className="text-center mb-4">Login</h2>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          {showError && <Alert variant="danger">Invalid username or password!</Alert>}

          <Button variant="primary" type="submit" className="w-100">
            Login
          </Button>
        </Form>

        <Modal show={showSuccessModal} centered>
          <Modal.Header>
            <Modal.Title>Login Successful</Modal.Title>
          </Modal.Header>
          <Modal.Body>Welcome, {username} login Successful!</Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

Login.propTypes = {
  setUser: PropTypes.func.isRequired,
};

export default Login;
