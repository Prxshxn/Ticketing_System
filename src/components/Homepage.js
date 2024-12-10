import React, { useState, useEffect } from "react";
import { Container, Button, Card, Row, Col, Modal, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NavbarComponent from "./NavbarComponent";
import FooterComponent from "./FooterComponent";
import axios from "axios";

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [customerDetails, setCustomerDetails] = useState({ name: "", email: "", telephone: "", password: "" });
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const navigate = useNavigate();

  // Handle modal state
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  // Fetch upcoming events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/events");
        setUpcomingEvents(response.data.slice(0, 3)); // Limit to 3 upcoming events
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  // Handle form changes
  const handleChange = (e) => {
    setCustomerDetails({ ...customerDetails, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        // Handle login
        const response = await axios.post("http://localhost:5000/api/customers/login", {
          email: customerDetails.email,
          password: customerDetails.password,
        });
        alert("Login successful!");
        handleCloseModal();
        navigate("/events"); // Redirect to events page
      } else {
        // Handle registration
        const response = await axios.post("http://localhost:5000/api/customers/register", customerDetails);
        alert("Registration successful! Please log in to continue.");
        setIsLogin(true); // Switch to login mode
      }
    } catch (error) {
      console.error("Error during authentication:", error);
      alert("Failed to authenticate. Please try again.");
    }
  };

  return (
    <div>
      {/* Navbar */}
      <NavbarComponent />

      {/* Hero Section */}
      <div
        style={{
          backgroundImage: `url("sector.avif")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "white",
          textAlign: "center",
          padding: "100px 20px",
        }}
      >
        <Container>
          <h1>Event Ticketing</h1>
          <Button variant="danger" size="lg" onClick={handleShowModal}>
            Buy Tickets
          </Button>
        </Container>
      </div>

      {/* Upcoming Events Section */}
      <Container className="mt-5">
        <h2 className="text-center mb-4">Upcoming Events</h2>
        <Row>
          {upcomingEvents.map((event) => (
            <Col md={4} key={event._id} className="mb-4">
              <Card>
                <Card.Img variant="top" src={event.image || "path/to/default-image.jpg"} alt={event.title} />
                <Card.Body>
                  <Card.Title>{event.title}</Card.Title>
                  <Card.Text>
                    Date: {event.date}
                    <br />
                    Location: {event.location}
                  </Card.Text>
                  <Button variant="primary" onClick={handleShowModal}>
                    Learn More
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <div className="text-center">
          <Button variant="secondary" onClick={() => navigate("/events")}>
            Load More
          </Button>
        </div>
      </Container>

      {/* Footer */}
      <FooterComponent />

      {/* Modal for Customer Login/Registration */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{isLogin ? "Customer Login" : "Customer Registration"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            {!isLogin && (
              <>
                <Form.Group controlId="formCustomerName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your name"
                    name="name"
                    value={customerDetails.name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formCustomerTelephone" className="mt-3">
                  <Form.Label>Telephone</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your telephone number"
                    name="telephone"
                    value={customerDetails.telephone}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </>
            )}
            <Form.Group controlId="formCustomerEmail" className="mt-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                name="email"
                value={customerDetails.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formCustomerPassword" className="mt-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                name="password"
                value={customerDetails.password}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button variant="success" type="submit" className="mt-4">
              {isLogin ? "Login" : "Register"}
            </Button>
          </Form>
          <Button
            variant="link"
            className="mt-3"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Don't have an account? Register here" : "Already have an account? Login here"}
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default HomePage;
