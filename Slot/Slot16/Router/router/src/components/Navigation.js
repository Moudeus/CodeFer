import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

function Navigation() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const currentUser = localStorage.getItem("currentUser");

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  return (
    <Navbar expand="lg" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">
          React Router Demo
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/about">
              About
            </Nav.Link>
            {isLoggedIn && (
              <Nav.Link as={Link} to="/posts">
                Posts
              </Nav.Link>
            )}
          </Nav>
          <Nav>
            {isLoggedIn ? (
              <div className="d-flex align-items-center">
                <span className="text-light me-3">Welcome, {currentUser}</span>
                <Button variant="outline-light" onClick={handleLogout} className="nav-btn">
                  Logout
                </Button>
              </div>
            ) : (
              <Nav.Link as={Link} to="/login" className="btn btn-outline-light nav-btn">
                Login
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
