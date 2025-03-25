import React, { useState, useEffect } from "react";
import { Table, Form, Button, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";

const CarManagement = ({ user }) => {
  const [cars, setCars] = useState([]);
  const [sortOrder, setSortOrder] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const response = await axios.get("http://localhost:9999/Cars");
      setCars(response.data);
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };

  const handleSort = (order) => {
    setSortOrder(order);
    const sortedCars = [...cars].sort((a, b) => {
      const priceA = parseFloat(a.price.replace("$", "").replace(",", ""));
      const priceB = parseFloat(b.price.replace("$", "").replace(",", ""));
      return order === "asc" ? priceA - priceB : priceB - priceA;
    });
    setCars(sortedCars);
  };

  return (
    <div>
      <div className="d-flex justify-content-center align-items-center mb-4">
        <h2>Car List</h2>
      </div>

      <div style={{ width: "200px", marginBottom: "20px" }}>
        <Form.Select value={sortOrder} onChange={(e) => handleSort(e.target.value)}>
          <option value="">Sort by Price</option>
          <option value="asc">Lowest to Highest</option>
          <option value="desc">Highest to Lowest</option>
        </Form.Select>
      </div>

      <Row xs={1} md={2} lg={4} className="g-4">
        {cars.map((car) => (
          <Col key={car.id}>
            <Card>
              <Card.Img variant="top" src={car.image} style={{ height: "200px", objectFit: "cover" }} />
              <Card.Body>
                <Card.Title>
                  {car.brand} {car.model}
                </Card.Title>
                <Card.Text>
                  <strong>Year:</strong> {car.year}
                  <br />
                  <strong>Price:</strong> {car.price}
                </Card.Text>
                <Button variant="primary" onClick={() => navigate(`/cars/${car.id}`)}>
                  View Details
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

CarManagement.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    account_type: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
};

export default CarManagement;
