import React, { useState } from "react";
import { Container, Button, Card, Row, Col, Modal, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NavbarComponent from "./NavbarComponent";
import FooterComponent from "./FooterComponent";
import axios from "axios";

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [customerDetails, setCustomerDetails] = useState({ name: "", email: "", telephone: "", password: "" });
  const navigate = useNavigate();

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleChange = (e) => {
    setCustomerDetails({ ...customerDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        // Handle Login
        const response = await axios.post("http://localhost:5000/api/customers/login", {
          email: customerDetails.email,
          password: customerDetails.password,
        });
        alert("Login successful!");
        handleCloseModal();
        navigate("/events"); // Redirect to events page
      } else {
        // Handle Registration
        const response = await axios.post("http://localhost:5000/api/customers/register", customerDetails);
        alert("Registration successful! Please log in to continue.");
        setIsLogin(true); // Switch to login after registration
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
          {/* Replace with your dynamic event data */}
          <Col md={4} className="mb-4">
            <Card>
              <Card.Img variant="top" src="path/to/event-image1.jpg" alt="Event 1" />
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
              <Card.Img variant="top" src="path/to/event-image2.jpg" alt="Event 2" />
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
              <Card.Img variant="top" src="path/to/event-image3.jpg" alt="Event 3" />
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
