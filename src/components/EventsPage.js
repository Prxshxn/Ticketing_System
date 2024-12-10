import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import NavbarComponent from "./NavbarComponent";
import FooterComponent from "./FooterComponent";
import axios from "axios";

const EventsPage = () => {
  const [events, setEvents] = useState([]);

  // Fetch events from backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/events");
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div>
      <NavbarComponent />
      <Container className="mt-5">
        <h2 className="text-center mb-4">Events</h2>
        <Row>
          {events.map(event => (
            <Col md={4} key={event._id} className="mb-4">
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
