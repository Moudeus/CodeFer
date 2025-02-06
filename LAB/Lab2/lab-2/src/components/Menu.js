import { Button, Card, Row, Col } from "react-bootstrap";

import menu1 from "../Images/menu1.jpg";
import menu2 from "../Images/menu2.jpg";
import menu3 from "../Images/menu3.jpg";
import menu4 from "../Images/menu4.jpg";

import { memo } from "react";
import { Container } from "react-bootstrap";
import "../css/Menu.css";

function Menu() {
  const menuItems = [
    {
      image: menu1,
      title: "Margherita Pizza",
      oldPrice: "$30.00",
      newPrice: "$25.00",
    },
    {
      image: menu2,
      title: "Mushroom Pizza",
      oldPrice: "$35.00",
      newPrice: "$30.00",
    },
    {
      image: menu3,
      title: "Hawaiian Pizza",
      oldPrice: "$40.00",
      newPrice: "$35.00",
    },
    {
      image: menu4,
      title: "Pesto Pizza",
      oldPrice: "$45.00",
      newPrice: "$40.00",
    },
  ];

  return (
    <Container className="my-5">
      <Row>
        {menuItems.map((item, index) => (
          <Col md={3} key={index}>
            <Card className="position-relative">
              <div className="sale-tag">Sale</div>
              <Card.Img variant="top" src={item.image} alt={item.title} />
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text>
                  <span className="old-price">{item.oldPrice}</span> <span className="new-price">{item.newPrice}</span>
                </Card.Text>
                <Button variant="primary">Order Now</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default memo(Menu);
