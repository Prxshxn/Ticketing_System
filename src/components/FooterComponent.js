import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const FooterComponent = () => {
  return (
    <footer
      className="text-white text-center py-4"
      style={{ backgroundColor: "#343a40" }}
    >
      <Container>
        <Row>
          <Col>
            <h5>About Us</h5>
            <p>Information about your company.</p>
          </Col>
          <Col>
            <h5>Event Plans</h5>
            <p>Details about planning events.</p>
          </Col>
          <Col>
            <h5>Follow Us</h5>
            <p>Social media links here.</p>
          </Col>
        </Row>
      </Container>
      <p className="mt-3">© 2024 Your Company Name</p>
    </footer>
  );
};

export default FooterComponent;
