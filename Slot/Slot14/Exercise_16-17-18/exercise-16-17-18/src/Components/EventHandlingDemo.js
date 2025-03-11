import React, { useState } from "react";
import "./Components.css";

const EventHandlingDemo = () => {
  const [count, setCount] = useState(0);

  const handleButtonClick = () => {
    setCount(count + 1);
  };

  return (
    <div className="glass-card">
      <h1>Event Handling Demo</h1>
      <p>Count: {count}</p>
      <button className="glass-button" onClick={handleButtonClick}>
        Increase Count
      </button>
    </div>
  );
};

export default EventHandlingDemo;
