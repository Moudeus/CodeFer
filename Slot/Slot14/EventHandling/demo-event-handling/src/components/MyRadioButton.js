import React, { useState } from "react";
import { Form, Alert } from "react-bootstrap";

function MyRadioButton() {
  const [selectedValue, setSelectedValue] = useState("option1");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);
    setAlertMessage(`You selected: ${value}`);
    setShowAlert(true);
  };

  const handleCloseAlert = () => setShowAlert(false);

  return (
    <div>
      <h3>Radio Button Example</h3>
      <Form>
        <Form.Check
          type="radio"
          label="Option 1"
          value="option1"
          checked={selectedValue === "option1"}
          onChange={handleChange}
          className="mb-2"
        />
        <Form.Check
          type="radio"
          label="Option 2"
          value="option2"
          checked={selectedValue === "option2"}
          onChange={handleChange}
        />
      </Form>

      {showAlert && (
        <Alert variant="info" onClose={handleCloseAlert} dismissible className="mt-3">
          {alertMessage}
        </Alert>
      )}
    </div>
  );
}

export default MyRadioButton;
