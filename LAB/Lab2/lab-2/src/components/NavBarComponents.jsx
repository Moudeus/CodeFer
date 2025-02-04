import { Container, Nav, Navbar, Button, Form } from "react-bootstrap";
import { memo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
const NavBarComponents = () => {
  return (
    <>
      <Navbar className="custom-navbar" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Pizza House</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">About Us</Nav.Link>
            <Nav.Link href="#pricing">Contact</Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control type="search" placeholder="Search" className="me-2 bg-white text-dark" aria-label="Search" />
            <Button variant="danger">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </Button>
          </Form>
        </Container>
      </Navbar>
    </>
  );
};

export default memo(NavBarComponents);
