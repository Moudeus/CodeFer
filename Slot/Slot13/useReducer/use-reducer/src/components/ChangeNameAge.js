import React, { useReducer } from "react";
import { Form, Container, Card } from "react-bootstrap";

function formReducer(state, action) {
  switch (action.type) {
    case "SET_NAME":
      return { ...state, name: action.value };
    case "SET_AGE":
      return { ...state, age: action.value };
    default:
      return state;
  }
}

function ChangeNameAge() {
  const [state, dispatch] = useReducer(formReducer, { name: "", age: "" });

  const handleNameChange = (e) => {
    dispatch({ type: "SET_NAME", value: e.target.value });
  };

  const handleAgeChange = (e) => {
    dispatch({ type: "SET_AGE", value: e.target.value });
  };

  return (
    <Container className="mt-5 name-age-container">
      <Card className="mx-auto glass-card" style={{ maxWidth: "500px" }}>
        <Card.Body>
          <Card.Title className="text-center mb-4">User Information</Card.Title>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name:</Form.Label>
              <Form.Control type="text" value={state.name} onChange={handleNameChange} placeholder="Input name" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Age:</Form.Label>
              <Form.Control type="text" value={state.age} onChange={handleAgeChange} placeholder="Input age" />
            </Form.Group>
          </Form>
          <div className="mt-4">
            <h5>Current Values:</h5>
            <p className="mb-1">
              <strong>Name:</strong> {state.name || "Not set"}
            </p>
            <p className="mb-0">
              <strong>Age:</strong> {state.age || "Not set"}
            </p>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default ChangeNameAge;
