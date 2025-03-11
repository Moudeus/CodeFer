import React, { useState } from "react";
import { Container, Card, Button } from "react-bootstrap";
import EventHandlingDemo from "./components/EventHandlingDemo";
import MyAlert from "./components/MyAlert";
import MyDropdown from "./components/MyDropdown";
import MyModal from "./components/MyModal";
import MyRadioButton from "./components/MyRadioButton";

function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const components = [
    { title: "Click Counter", component: <EventHandlingDemo /> },
    { title: "Alert Demo", component: <MyAlert /> },
    { title: "Dropdown Demo", component: <MyDropdown /> },
    { title: "Modal Demo", component: <MyModal /> },
    { title: "Radio Button Demo", component: <MyRadioButton /> },
  ];

  const nextCard = () => {
    setActiveIndex((current) => (current === components.length - 1 ? 0 : current + 1));
  };

  const prevCard = () => {
    setActiveIndex((current) => (current === 0 ? components.length - 1 : current - 1));
  };

  return (
    <Container className="py-5">
      <h1 className="text-center mb-5 glow-text">React Event Handling Examples</h1>

      <div className="carousel-container">
        <Button variant="outline-light" className="carousel-btn prev-btn" onClick={prevCard}>
          &#8249;
        </Button>

        <div className="cards-wrapper">
          {components.map((item, index) => (
            <Card
              key={index}
              className={`carousel-card ${index === activeIndex ? "active" : ""}`}
              style={{
                "--offset": index - activeIndex,
              }}>
              <Card.Body>
                <h3 className="text-center mb-4">{item.title}</h3>
                {item.component}
              </Card.Body>
            </Card>
          ))}
        </div>

        <Button variant="outline-light" className="carousel-btn next-btn" onClick={nextCard}>
          &#8250;
        </Button>
      </div>
    </Container>
  );
}

export default App;
