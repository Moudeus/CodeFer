import React, { useState } from "react";

function ToggleVisibility() {
  const [isVisible, setIsVisible] = useState(false);

  const handleToggle = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div style={{ margin: "20px" }}>
      <button onClick={handleToggle}>{isVisible ? "Hide" : "Show"}</button>

      {isVisible && <p>This is the hidden text that will appear and disappear when you click the button!</p>}
    </div>
  );
}

export default ToggleVisibility;
