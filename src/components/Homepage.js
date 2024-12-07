import React from "react";
import { Container, Button, Card, Row, Col } from "react-bootstrap";
import NavbarComponent from "./NavbarComponent";
import FooterComponent from "./FooterComponent";

const HomePage = () => {
  return (
    <div>
      {/* Navbar */}
      <NavbarComponent/>

      {/* Hero Section */}
      <div
        style={{
          backgroundImage: `url("path/to/your/hero-image.jpg")`, // Replace with your hero image
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "white",
          textAlign: "center",
          padding: "100px 20px",
        }}
      >
        <Container>
          <h1>SBS MTV The Kpop Show Ticket Package</h1>
          <p>Location: [Insert Location] | Time: [Insert Time]</p>
          <Button variant="danger" size="lg">
            Buy Tickets
          </Button>
        </Container>
      </div>

      {/* Upcoming Events Section */}
      <Container className="mt-5">
        <h2 className="text-center mb-4">Upcoming Events</h2>
        <Row>
          {/* Replace the placeholders below with your event data */}
          <Col md={4} className="mb-4">
            <Card>
              <Card.Img variant="top" src="path/to/event-image1.jpg" alt="Event 1" /> {/* Replace image */}
              <Card.Body>
                <Card.Title>Event Title 1</Card.Title>
                <Card.Text>
                  Event Date: [Insert Date]
                  <br />
                  Location: [Insert Location]
                </Card.Text>
                <Button variant="primary">Learn More</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card>
              <Card.Img variant="top" src="path/to/event-image2.jpg" alt="Event 2" /> {/* Replace image */}
              <Card.Body>
                <Card.Title>Event Title 2</Card.Title>
                <Card.Text>
                  Event Date: [Insert Date]
                  <br />
                  Location: [Insert Location]
                </Card.Text>
                <Button variant="primary">Learn More</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card>
              <Card.Img variant="top" src="path/to/event-image3.jpg" alt="Event 3" /> {/* Replace image */}
              <Card.Body>
                <Card.Title>Event Title 3</Card.Title>
                <Card.Text>
                  Event Date: [Insert Date]
                  <br />
                  Location: [Insert Location]
                </Card.Text>
                <Button variant="primary">Learn More</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <div className="text-center">
          <Button variant="secondary">Load More</Button>
        </div>
      </Container>

      {/* Footer */}
      <FooterComponent />
    </div>
  );
};

export default HomePage;
