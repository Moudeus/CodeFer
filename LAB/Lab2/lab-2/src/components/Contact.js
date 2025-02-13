import { memo } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";

function Contact() {
  return (
    <div className="container">
      <Row className="text-center">
        <Col>
          <h3 className="mt-5 text-white">Contact With US</h3>
        </Col>
      </Row>
      <Form>
        <Form.Group className="mb-3">
          <Row>
            <Col>
              <Form.Control type="Name" placeholder="Name*" />{" "}
            </Col>
            <Col>
              <Form.Control type="email" placeholder="Email*" />{" "}
            </Col>
            <Col>
              <Form.Select aria-label="Default select example" placeholder="Select a service">
                <option value="1">Complain Service</option>
                <option value="2">Feedback</option>
                <option value="3">Other</option>
              </Form.Select>
            </Col>
          </Row>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control as="textarea" rows={3} placeholder="Please write your message here..." />
        </Form.Group>
        <Button variant="outline-success">SEND!</Button>
      </Form>
    </div>
  );
}

export default memo(Contact);
