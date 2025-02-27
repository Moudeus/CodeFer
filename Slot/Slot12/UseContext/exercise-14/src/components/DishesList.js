import React from "react";
import { useCart } from "../contexts/CartContext";
import { dishes } from "../data/dishes";
import "./DishesList.css"; // Import the CSS file for styling

const DishesList = ({ searchTerm }) => {
  const { addToCart } = useCart();

  const filteredDishes = dishes.filter(
    (dish) =>
      dish.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dish.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dishes-container">
      {filteredDishes.map((dish) => (
        <div key={dish.id} className="dish-card">
          <img src={dish.imageUrl} alt={dish.name} className="dish-image" />
          <div className="dish-info">
            <h2>{dish.name}</h2>
            <p>{dish.description}</p>
            <p>${dish.price.toFixed(2)}</p>
            <button onClick={() => addToCart(dish)}>Add to Cart</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DishesList;
