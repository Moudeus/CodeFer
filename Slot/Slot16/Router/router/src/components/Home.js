import React from "react";
import { Container, Card } from "react-bootstrap";

function Home() {
  return (
    <Container className="mt-5">
      <Card className="shadow-sm">
        <Card.Body className="p-4">
          <h1 className="text-center mb-4">Welcome to React Router Demo</h1>
          <div className="text-center">
            <p className="lead">This is a demo application showcasing React Router capabilities with:</p>
            <ul className="list-unstyled">
              <li className="mb-2">✨ Protected Routes</li>
              <li className="mb-2">🔐 User Authentication</li>
              <li className="mb-2">📱 Responsive Design</li>
              <li className="mb-2">🎯 Dynamic Post Loading</li>
            </ul>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Home;
