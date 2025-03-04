import React, { useReducer } from "react";
import { Button, Container, Card } from "react-bootstrap";

function counterReducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    case "DECREMENT":
      return { count: state.count - 1 };
    case "RESET":
      return { count: 0 };
    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });

  return (
    <Container className="mt-5 counter-container">
      <Card className="mx-auto glass-card" style={{ maxWidth: "400px" }}>
        <Card.Body className="text-center">
          <Card.Title className="mb-4">Counter Exercise</Card.Title>
          <h1 className="display-4 mb-4">{state.count}</h1>
          <div className="d-flex justify-content-center gap-2">
            <Button variant="primary" onClick={() => dispatch({ type: "INCREMENT" })}>
              +
            </Button>
            <Button variant="secondary" onClick={() => dispatch({ type: "DECREMENT" })}>
              -
            </Button>
            <Button variant="warning" onClick={() => dispatch({ type: "RESET" })}>
              Reset
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Counter;
