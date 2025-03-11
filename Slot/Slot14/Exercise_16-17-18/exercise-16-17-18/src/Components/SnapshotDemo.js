import React, { useState } from "react";
import "./Components.css";

const SnapshotDemo = () => {
  const [count, setCount] = useState(0);
  const [snapshot, setSnapshot] = useState(null);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleSnapshot = () => {
    setSnapshot(count);
  };

  const handleRestore = () => {
    if (snapshot !== null) {
      setCount(snapshot);
    }
  };

  return (
    <div className="glass-card">
      <h1>State as a Snapshot Demo</h1>
      <p>Count: {count}</p>
      <div>
        <button className="glass-button" onClick={handleIncrement}>
          Increment
        </button>
        <button className="glass-button" onClick={handleSnapshot}>
          Take Snapshot
        </button>
        <button className="glass-button" onClick={handleRestore}>
          Restore Snapshot
        </button>
      </div>
    </div>
  );
};

export default SnapshotDemo;
