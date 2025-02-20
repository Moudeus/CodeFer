import React, { useState } from "react";

function ColorSwitcher() {
  const [selectedColor, setSelectedColor] = useState("white");

  const colors = [
    { value: "white", label: "Default" },
    { value: "red", label: "Red" },
    { value: "blue", label: "Blue" },
    { value: "green", label: "Green" },
    { value: "yellow", label: "Yellow" },
  ];

  const handleColorChange = (event) => {
    setSelectedColor(event.target.value);
  };

  return (
    <div style={{ margin: "20px" }}>
      <h2>Color Switcher</h2>
      <select
        value={selectedColor}
        onChange={handleColorChange}
        style={{
          marginBottom: "10px",
          padding: "5px",
        }}>
        {colors.map((color) => (
          <option key={color.value} value={color.value}>
            {color.label}
          </option>
        ))}
      </select>

      <div
        style={{
          width: "200px",
          height: "200px",
          backgroundColor: selectedColor,
          margin: "0 auto",
          border: "1px solid #ccc",
          borderRadius: "4px",
          transition: "background-color 0.3s ease",
        }}>
        <p
          style={{
            padding: "10px",
            color: selectedColor === "yellow" ? "black" : "white",
          }}>
          Selected color: {selectedColor}
        </p>
      </div>
    </div>
  );
}

export default ColorSwitcher;
