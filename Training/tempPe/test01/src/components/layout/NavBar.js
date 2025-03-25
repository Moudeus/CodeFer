import React from "react";
import { Navbar, Nav, Container, NavDropdown, Badge } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import useCart from "../../hooks/useCart";
import { FaShoppingCart, FaUser, FaCog } from "react-icons/fa";

const NavBar = () => {
  const { user, logout } = useAuth();
  const { cartItemsCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Navbar bg="light" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/">
          E-Commerce
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Products
            </Nav.Link>

            {user?.role === "manager" && (
              <NavDropdown
                title={
                  <>
                    <FaCog /> Manage
                  </>
                }
                id="manager-nav">
                <NavDropdown.Item as={Link} to="/manage/products">
                  Manage Products
                </NavDropdown.Item>
              </NavDropdown>
            )}

            {user?.role === "admin" && (
              <NavDropdown
                title={
                  <>
                    <FaCog /> Admin
                  </>
                }
                id="admin-nav">
                <NavDropdown.Item as={Link} to="/admin/dashboard">
                  Dashboard
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/admin/payments">
                  Payment History
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>

          <Nav>
            {user ? (
              <>
                <Nav.Link as={Link} to="/cart" className="me-2">
                  <FaShoppingCart />
                  {cartItemsCount > 0 && (
                    <Badge
                      bg="danger"
                      pill
                      className="position-absolute translate-middle"
                      style={{ top: "0", right: "0" }}>
                      {cartItemsCount}
                    </Badge>
                  )}
                </Nav.Link>

                <NavDropdown
                  title={
                    <span>
                      <FaUser className="me-1" />
                      {user.username}
                    </span>
                  }
                  id="user-nav">
                  <NavDropdown.Item as={Link} to="/orders">
                    Order History
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
