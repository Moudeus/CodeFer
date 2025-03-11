import React, { useState } from "react";
import "./Components.css";

const RenderAndCommitDemo = () => {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <div className="glass-card">
      <h1>Render and Commit Demo</h1>
      <p>Count: {count}</p>
      <button className="glass-button" onClick={handleClick}>
        Increment
      </button>
    </div>
  );
};

export default RenderAndCommitDemo;
