import React, { useState } from "react";
import { Alert, Button } from "react-bootstrap";

function MyAlert() {
  const [show, setShow] = useState(false);

  const handleButtonClick = () => {
    setShow(true);
  };

  const handleAlertClose = () => setShow(false);

  return (
    <div>
      <h3>Alert Example</h3>
      <Button variant="outline-light" onClick={handleButtonClick}>
        Show Alert
      </Button>
      {show && (
        <Alert variant="success" onClose={handleAlertClose} dismissible className="mt-3">
          <Alert.Heading>Success!</Alert.Heading>
          <p>This is a success alert—check it out!</p>
        </Alert>
      )}
    </div>
  );
}

export default MyAlert;
