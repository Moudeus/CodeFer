import React, { useState } from "react";
import { Container, Form, Button, Row, Col, InputGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function Contact() {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Contact Us</h2>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="firstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control required type="text" placeholder="Enter first name" />
            <Form.Control.Feedback type="invalid">Please enter your first name.</Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="6" controlId="lastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control required type="text" placeholder="Enter last name" />
            <Form.Control.Feedback type="invalid">Please enter your last name.</Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Username</Form.Label>
          <InputGroup hasValidation>
            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
            <Form.Control type="text" placeholder="Username" aria-describedby="inputGroupPrepend" required />
            <Form.Control.Feedback type="invalid">Please choose a username.</Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control type="text" placeholder="City" required />
            <Form.Control.Feedback type="invalid">Please provide a valid city.</Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="3" controlId="state">
            <Form.Label>State</Form.Label>
            <Form.Control type="text" placeholder="State" required />
            <Form.Control.Feedback type="invalid">Please provide a valid state.</Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="3" controlId="zip">
            <Form.Label>Zip</Form.Label>
            <Form.Control type="text" placeholder="Zip" required />
            <Form.Control.Feedback type="invalid">Please provide a valid zip.</Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Form.Group className="mb-3">
          <Form.Check
            required
            label="Agree to terms and conditions"
            feedback="You must agree before submitting."
            feedbackType="invalid"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default Contact;
