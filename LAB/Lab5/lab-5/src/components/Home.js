import React, { useState } from "react";
import { Carousel, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function Home() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const menuItems = [
    { id: 1, image: "/images/menu-01.jpg" },
    { id: 2, image: "/images/menu-02.jpg" },
    { id: 3, image: "/images/menu-03.jpg" },
    { id: 4, image: "/images/menu-04.jpg" },
    { id: 5, image: "/images/menu-05.jpg" },
    { id: 6, image: "/images/menu-06.jpg" },
    { id: 7, image: "/images/menu-07.jpg" },
    { id: 8, image: "/images/menu-08.jpg" },
  ];

  return (
    <div className="home-container">
      <Carousel activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/slide1.jpg"
            alt="First slide"
            style={{ maxHeight: "500px", objectFit: "cover" }}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/slide2.jpg"
            alt="Second slide"
            style={{ maxHeight: "500px", objectFit: "cover" }}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/slide3.jpg"
            alt="Third slide"
            style={{ maxHeight: "500px", objectFit: "cover" }}
          />
        </Carousel.Item>
      </Carousel>

      <Container className="mt-5">
        <h1 className="text-center mb-4">Welcome to Our Quiz App</h1>
        <p className="text-center mb-5">Test your knowledge with our interactive quizzes!</p>

        <div className="menu-container">
          <h2 className="text-center mb-4">Our Menu</h2>
          <div className="menu-scroll-container">
            <div className="menu-scroll">
              {menuItems.map((item) => (
                <div key={item.id} className="menu-item">
                  <div className="circular-image">
                    <img src={item.image} alt={`Menu item ${item.id}`} className="rounded-circle" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Home;
