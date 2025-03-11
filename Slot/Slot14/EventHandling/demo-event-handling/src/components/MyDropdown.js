import React, { useState } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";

function MyDropdown() {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleSelect = (eventKey, event) => {
    setSelectedItem(event.target.innerText);
  };

  return (
    <div>
      <h3>Dropdown Example</h3>
      <DropdownButton
        id="dropdown-basic-button"
        title={selectedItem || "Select an item"}
        onSelect={handleSelect}
        variant="outline-light">
        <Dropdown.Item eventKey="1">Item 1</Dropdown.Item>
        <Dropdown.Item eventKey="2">Item 2</Dropdown.Item>
        <Dropdown.Item eventKey="3">Item 3</Dropdown.Item>
      </DropdownButton>

      {selectedItem && (
        <div className="mt-3">
          <p>You selected: {selectedItem}</p>
        </div>
      )}
    </div>
  );
}

export default MyDropdown;
