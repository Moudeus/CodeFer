import React from "react";
import { Container, Alert } from "react-bootstrap";
import FlightBookingForm from "./components/FlightBookingForm";

const App = () => {
  return (
    <Container className="mt-4">
      <Alert variant="primary">Form đặt vé máy bay</Alert>
      <FlightBookingForm />
    </Container>
  );
};

export default App;
