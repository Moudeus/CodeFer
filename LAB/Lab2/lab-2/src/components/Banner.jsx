import { Carousel, Image } from "react-bootstrap";

import pizza1 from "../Images/pizza1.jpg";
import pizza2 from "../Images/pizza2.jpg";
import pizza3 from "../Images/pizza3.jpg";
import pizza4 from "../Images/pizza4.jpg";
import pizza5 from "../Images/pizza5.jpg";

import { memo } from "react";

const Banner = () => {
  const carouselItems = [
    {
      image: pizza1,
      title: "Neapolitan Pizza",
      description: `"If you want to taste the best pizza in the world, you should try Neapolitan Pizza"`,
    },
    {
      image: pizza2,
      title: "Chicago Pizza",
      description: `" If you want to taste a pizza that is as big as a pie, you should try Chicago Pizza"`,
    },
    {
      image: pizza3,
      title: " New York Pizza",
      description: `"New York Pizza is the best choice for those who want to eat a pizza that is thin and crispy"`,
    },
    {
      image: pizza4,
      title: "Pizza Margherita",
      description: `"Taste the best pizza in the world with Pizza Margherita"`,
    },
    {
      image: pizza5,
      title: "Be like a Pizza",
      description: `" Be like a pizza, have a good crust, and be full of yourself"`,
    },
  ];
  return (
    <Carousel>
      {carouselItems.map((item, index) => (
        <Carousel.Item key={index}>
          <Image src={item.image} fluid className="carousel-image" />
          <Carousel.Caption>
            <h3>{item.title}</h3>
            <i>{item.description}</i>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default memo(Banner);
