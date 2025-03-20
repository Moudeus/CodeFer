import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function About() {
  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <h2 className="mb-4">About Us</h2>
          <p>
            Welcome to our Quiz Application! We are dedicated to providing an engaging and interactive learning
            experience through our diverse range of quizzes.
          </p>
          <p>
            Our platform offers various categories of quizzes designed to test and enhance your knowledge while making
            learning fun and interactive. Whether you're a student looking to test your academic knowledge or someone
            who enjoys learning new things, we have something for everyone.
          </p>
          <h3 className="mt-4 mb-3">Our Mission</h3>
          <p>
            Our mission is to make learning engaging and accessible to everyone through interactive quizzes. We believe
            that knowledge testing should be both challenging and enjoyable.
          </p>
          <h3 className="mt-4 mb-3">What We Offer</h3>
          <ul>
            <li>Wide range of quiz categories</li>
            <li>Interactive and user-friendly interface</li>
            <li>Regular updates with new questions</li>
            <li>Instant feedback on your performance</li>
          </ul>
        </Col>
      </Row>
    </Container>
  );
}

export default About;
