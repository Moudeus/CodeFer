import React, { useState } from "react";

function ProductSelection() {
  const [selectedProduct, setSelectedProduct] = useState("");

  const products = [
    { id: 1, name: "iPhone 12", price: 999 },
    { id: 2, name: "Samsung S21", price: 899 },
    { id: 3, name: "Google Pixel 6", price: 799 },
  ];

  const handleProductSelect = (event) => {
    setSelectedProduct(event.target.value);
  };

  return (
    <div>
      <h2>Select a Product</h2>
      {products.map((product) => (
        <div key={product.id}>
          <input
            type="radio"
            id={`product-${product.id}`}
            name="product"
            value={product.name}
            onChange={handleProductSelect}
          />
          <label htmlFor={`product-${product.id}`}>
            {product.name} - ${product.price}
          </label>
        </div>
      ))}

      {selectedProduct && (
        <div style={{ marginTop: "20px" }}>
          <h3>Selected Product:</h3>
          <p>{selectedProduct}</p>
        </div>
      )}
    </div>
  );
}

export default ProductSelection;
