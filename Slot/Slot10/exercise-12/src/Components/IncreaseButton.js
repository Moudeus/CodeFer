import React, { useState } from "react";

function IncreaseButton() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button style={{ borderRadius: "5px" }} onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
export default IncreaseButton;
