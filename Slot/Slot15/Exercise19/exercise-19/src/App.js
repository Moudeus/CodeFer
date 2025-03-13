import React from "react";
import "./App.css";
import AnimalCard from "./components/AnimalCard/AnimalCard";
import data from "./data";

function App() {
  const showAdditional = (additional) => {
    const alertInformation = Object.entries(additional)
      .map((information) => `${information[0]}: ${information[1]}`)
      .join("\n");
    alert(alertInformation);
  };

  return (
    <div className="App">
      <h1>Animals</h1>
      <div className="container">
        {data.map((animal) => (
          <AnimalCard
            key={animal.name}
            name={animal.name}
            scientificName={animal.scientificName}
            size={animal.size}
            diet={animal.diet}
            additional={animal.additional}
            showAdditional={showAdditional}
            image={animal.image}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
