import React, { useState } from "react";
import { Button } from "react-bootstrap";

function EventHandlingDemo() {
  const [count, setCount] = useState(0);

  const handleButtonClick = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <h3>Click Counter Example</h3>
      <p>Count: {count}</p>
      <Button variant="outline-light" onClick={handleButtonClick}>
        Increment Count
      </Button>
    </div>
  );
}

export default EventHandlingDemo;
