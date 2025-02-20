import React, { useState } from "react";

function SearchFilter() {
  const [searchQuery, setSearchQuery] = useState("");

  // Sample data - you can replace this with your own data
  const items = [
    "Apple iPhone 13",
    "Samsung Galaxy S21",
    "Google Pixel 6",
    "OnePlus 9",
    "Xiaomi Mi 11",
    "Sony Xperia 1",
    "Huawei P40",
    "ASUS ROG Phone",
    "LG Velvet",
    "Motorola Edge",
  ];

  const filteredItems = items.filter((item) => item.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div style={{ margin: "20px", padding: "20px" }}>
      <h2>Search Filter</h2>
      <input
        type="text"
        placeholder="Search items..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{
          padding: "8px",
          marginBottom: "20px",
          width: "200px",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      />

      <ul
        style={{
          listStyle: "none",
          padding: 0,
          maxWidth: "300px",
          margin: "0 auto",
        }}>
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => (
            <li
              key={index}
              style={{
                padding: "10px",
                margin: "5px 0",
                backgroundColor: "#f5f5f5",
                borderRadius: "4px",
              }}>
              {item}
            </li>
          ))
        ) : (
          <p>No items found</p>
        )}
      </ul>
    </div>
  );
}

export default SearchFilter;
