import React from "react";
import { Container, Card } from "react-bootstrap";

function About() {
  return (
    <Container className="mt-5">
      <Card className="shadow-sm">
        <Card.Body className="p-4">
          <h2 className="text-center mb-4">About This Application</h2>
          <div className="text-center">
            <p className="lead mb-4">
              This is a demo application built with React and React Router, demonstrating various routing features and
              user authentication.
            </p>
            <div className="features">
              <h4 className="mb-3">Key Features:</h4>
              <div className="row justify-content-center">
                <div className="col-md-8">
                  <div className="d-flex flex-column align-items-start p-3">
                    <div className="feature-item mb-3 d-flex align-items-center">
                      <span className="feature-icon">🔐</span>
                      <span className="ms-3">Secure Authentication System</span>
                    </div>
                    <div className="feature-item mb-3 d-flex align-items-center">
                      <span className="feature-icon">🔄</span>
                      <span className="ms-3">Dynamic Route Management</span>
                    </div>
                    <div className="feature-item mb-3 d-flex align-items-center">
                      <span className="feature-icon">🛡️</span>
                      <span className="ms-3">Protected Route Implementation</span>
                    </div>
                    <div className="feature-item mb-3 d-flex align-items-center">
                      <span className="feature-icon">📱</span>
                      <span className="ms-3">Responsive Bootstrap Design</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default About;
