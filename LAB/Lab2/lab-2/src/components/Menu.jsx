import { Button, Card, Row, Col } from "react-bootstrap";

import menu1 from "../Images/menu1.jpg";
import menu2 from "../Images/menu2.jpg";
import menu3 from "../Images/menu3.jpg";
import menu4 from "../Images/menu4.jpg";

import { memo } from "react";
import { Container } from "react-bootstrap";
function Menu() {
  const menuItems = [
    {
      image: menu1,
      title: "Margherita Pizza",
      description: `$ 25.00`,
    },
    {
      image: menu2,
      title: "Mushroom Pizza",
      description: `$ 30.00`,
    },
    {
      image: menu3,
      title: "Hawaiian Pizza",
      description: `$ 35.00`,
    },
    {
      image: menu4,
      title: "Pesto Pizza",
      description: `$ 40.00`,
    },
  ];

  return (
    <Container className="my-5">
      <h2 className="text-white text-left">Oath</h2>
      <Row>
        {menuItems.map((item, index) => (
          <Col md={3} key={index}>
            <Card>
              <Card.Img variant="top" src={item.image} alt={item.title} />
              <Card.Body className="text-center">
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>{item.description}</Card.Text>
                <Button variant="dark" style={{ width: "100%" }}>
                  Buy
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default memo(Menu);
