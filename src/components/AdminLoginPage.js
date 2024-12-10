import React, { useState } from "react";
import { Container, Form, Button, Table } from "react-bootstrap";
import axios from "axios";
import NavbarComponent from "./NavbarComponent";

const AdminLoginPage = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ title: "", date: "", location: "", tickets: "" });

  const [vendor, setVendor] = useState({ vendorId: "", name: "", email: "" });
  const [ticketDetails, setTicketDetails] = useState({ vendorId: "", eventId: "", price: "", quantity: "" });

  // Handle Login
  const handleLogin = (e) => {
    e.preventDefault();
    if (credentials.username === "admin" && credentials.password === "pass") {
      setIsLoggedIn(true);
    } else {
      alert("Invalid username or password");
    }
  };

  // Handle Event Creation
  const handleEventCreation = async (e) => {
    e.preventDefault();
    if (!newEvent.tickets || isNaN(newEvent.tickets) || newEvent.tickets <= 0) {
      alert("Please enter a valid number of tickets.");
      return;
    }
    try {
      const response = await axios.post("http://localhost:5000/api/events", newEvent);
      setEvents([...events, { ...response.data, id: events.length + 1 }]);
      setNewEvent({ title: "", date: "", location: "", tickets: "" });
      alert("Event Created Successfully and Saved to Database!");
    } catch (error) {
      console.error("Error creating event:", error);
      alert("Failed to create the event. Please try again.");
    }
  };

  // Handle Vendor Registration
  const handleVendorRegistration = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/vendors", vendor);
      alert("Vendor registered successfully!");
      setVendor({ vendorId: "", name: "", email: "" });
    } catch (error) {
      console.error("Error registering vendor:", error);
      alert("Failed to register the vendor.");
    }
  };

  // Handle Ticket Issuing
  const handleTicketIssue = async (e) => {
    e.preventDefault();
    if (!ticketDetails.quantity || isNaN(ticketDetails.quantity) || ticketDetails.quantity <= 0) {
      alert("Please enter a valid number of tickets to issue.");
      return;
    }
    try {
      const response = await axios.post("http://localhost:5000/api/tickets", ticketDetails);
      alert(`Tickets issued successfully! Ticket IDs: ${response.data.tickets.join(", ")}`);
      setTicketDetails({ vendorId: "", eventId: "", price: "", quantity: "" });
    } catch (error) {
      console.error("Error issuing tickets:", error);
      alert("Failed to issue tickets.");
    }
  };

  return (
    <div>
      <NavbarComponent />
      <Container className="mt-5">
        {!isLoggedIn ? (
          <>
            <h2 className="text-center mb-4">Admin Login</h2>
            <Form onSubmit={handleLogin}>
              <Form.Group controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  value={credentials.username}
                  onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                />
              </Form.Group>
              <Form.Group controlId="formPassword" className="mt-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="mt-3">
                Login
              </Button>
            </Form>
          </>
        ) : (
          <>
            <h2 className="text-center mb-4">Admin Dashboard</h2>

            {/* Event Creation Form */}
            <div className="mt-4">
              <h3>Create Event</h3>
              <Form onSubmit={handleEventCreation}>
                <Form.Group controlId="formEventTitle">
                  <Form.Label>Event Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter event title"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  />
                </Form.Group>
                <Form.Group controlId="formEventDate" className="mt-3">
                  <Form.Label>Event Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                  />
                </Form.Group>
                <Form.Group controlId="formEventLocation" className="mt-3">
                  <Form.Label>Event Location</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter event location"
                    value={newEvent.location}
                    onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                  />
                </Form.Group>
                <Form.Group controlId="formEventTickets" className="mt-3">
                  <Form.Label>Number of Tickets</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter number of tickets"
                    value={newEvent.tickets}
                    onChange={(e) => setNewEvent({ ...newEvent, tickets: e.target.value })}
                  />
                </Form.Group>
                <Button variant="success" type="submit" className="mt-3">
                  Create Event
                </Button>
              </Form>
            </div>

            {/* Vendor Registration Form */}
            <div className="mt-4">
              <h3>Register Vendor</h3>
              <Form onSubmit={handleVendorRegistration}>
                <Form.Group controlId="formVendorId">
                  <Form.Label>Vendor ID</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter vendor ID"
                    value={vendor.vendorId}
                    onChange={(e) => setVendor({ ...vendor, vendorId: e.target.value })}
                  />
                </Form.Group>
                <Form.Group controlId="formVendorName" className="mt-3">
                  <Form.Label>Vendor Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter vendor name"
                    value={vendor.name}
                    onChange={(e) => setVendor({ ...vendor, name: e.target.value })}
                  />
                </Form.Group>
                <Form.Group controlId="formVendorEmail" className="mt-3">
                  <Form.Label>Vendor Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter vendor email"
                    value={vendor.email}
                    onChange={(e) => setVendor({ ...vendor, email: e.target.value })}
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-3">
                  Register Vendor
                </Button>
              </Form>
            </div>

            {/* Ticket Issuing Form */}
            <div className="mt-5">
              <h3>Issue Tickets</h3>
              <Form onSubmit={handleTicketIssue}>
                <Form.Group controlId="formVendorId">
                  <Form.Label>Vendor ID</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter vendor ID"
                    value={ticketDetails.vendorId}
                    onChange={(e) => setTicketDetails({ ...ticketDetails, vendorId: e.target.value })}
                  />
                </Form.Group>
                <Form.Group controlId="formEventId" className="mt-3">
                  <Form.Label>Event ID</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter event ID"
                    value={ticketDetails.eventId}
                    onChange={(e) => setTicketDetails({ ...ticketDetails, eventId: e.target.value })}
                  />
                </Form.Group>
                <Form.Group controlId="formPrice" className="mt-3">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter ticket price"
                    value={ticketDetails.price}
                    onChange={(e) => setTicketDetails({ ...ticketDetails, price: e.target.value })}
                  />
                </Form.Group>
                <Form.Group controlId="formQuantity" className="mt-3">
                  <Form.Label>Number of Tickets</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter number of tickets to issue"
                    value={ticketDetails.quantity}
                    onChange={(e) => setTicketDetails({ ...ticketDetails, quantity: e.target.value })}
                  />
                </Form.Group>
                <Button variant="success" type="submit" className="mt-3">
                  Issue Tickets
                </Button>
              </Form>
            </div>
          </>
        )}
      </Container>
    </div>
  );
};

export default AdminLoginPage;



