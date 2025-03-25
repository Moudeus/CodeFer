import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import axios from "axios";

const CarDetail = ({ user }) => {
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    fetchCarDetail();
  }, [id]);

  const fetchCarDetail = async () => {
    try {
      const response = await axios.get(`http://localhost:9999/Cars/${id}`);
      if (response.data) {
        setCar(response.data);
      } else {
        setError(true);
      }
    } catch (error) {
      console.error("Error fetching car details:", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !car) {
    return (
      <Container className="text-center mt-5">
        <h1>404: Car Not Found</h1>
        <Button as={Link} to="/cars" variant="primary">
          Back to Car Management
        </Button>
      </Container>
    );
  }

  return (
    <Container className="py-4 ">
      <Row>
        <Col md={6}>
          <img
            src={car.image}
            alt={`${car.brand} ${car.model}`}
            className="img-fluid rounded"
            style={{ width: "100%", height: "auto", maxHeight: "400px", objectFit: "cover" }}
          />
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title className="h2 mb-4">
                {car.brand} {car.model}
              </Card.Title>
              <div className="mb-3">
                <strong>Brand:</strong> {car.brand}
              </div>
              <div className="mb-3">
                <strong>Model:</strong> {car.model}
              </div>
              <div className="mb-3">
                <strong>Year:</strong> {car.year}
              </div>
              <div className="mb-3">
                <strong>Price:</strong> {car.price}
              </div>
              {car.description && (
                <div className="mb-3">
                  <strong>Description:</strong>
                  <p>{car.description}</p>
                </div>
              )}
              <Button as={Link} to="/cars" variant="primary">
                Back to Car Management
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

CarDetail.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    account_type: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
};

export default CarDetail;
