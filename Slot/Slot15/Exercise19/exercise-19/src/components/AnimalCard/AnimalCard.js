import React from "react";
import PropTypes from "prop-types";
import "./AnimalCard.css";

export default function AnimalCard({ name, scientificName, size, diet, additional, showAdditional, image }) {
  return (
    <div className="animal-wrapper">
      <img src={image} alt={name} />
      <h2 className="animal-title">{name}</h2>
      <h3 className="scientific-name">{scientificName}</h3>
      <div className="animal-details">
        <span>Size: {size}kg</span>
        <div>
          <strong>Diet:</strong> {diet.join(", ")}
        </div>
      </div>
      <button onClick={() => showAdditional(additional)}>More Info</button>
    </div>
  );
}

AnimalCard.propTypes = {
  additional: PropTypes.shape({
    link: PropTypes.string,
    notes: PropTypes.string,
  }),
  diet: PropTypes.arrayOf(PropTypes.string).isRequired,
  name: PropTypes.string.isRequired,
  scientificName: PropTypes.string.isRequired,
  showAdditional: PropTypes.func.isRequired,
  size: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
};

AnimalCard.defaultProps = {
  additional: {
    notes: "No Additional Information",
  },
};
