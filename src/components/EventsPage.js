import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import NavbarComponent from "./NavbarComponent";
import FooterComponent from "./FooterComponent";

const EventsPage = () => {
  const events = [
    { id: 1, title: "Music Fest", date: "2024-12-15", location: "London" },
    { id: 2, title: "Art Exhibit", date: "2024-12-20", location: "Paris" },
  ];

  return (
    <div>
      <NavbarComponent />
      <Container className="mt-5">
        <h2 className="text-center mb-4">Events</h2>
        <Row>
          {events.map(event => (
            <Col md={4} key={event.id} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>{event.title}</Card.Title>
                  <Card.Text>
                    Date: {event.date}
                    <br />
                    Location: {event.location}
                  </Card.Text>
                  <Button variant="primary">Learn More</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <FooterComponent />
    </div>
  );
};

export default EventsPage;
