import React, { useState } from "react";
import { Container, Form, Button, Table } from "react-bootstrap";
import axios from "axios";
import NavbarComponent from "./NavbarComponent";

const AdminLoginPage = () => {
  // State for managing login and admin actions
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ title: "", date: "", location: "", tickets: "" });

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate login validation
    if (credentials.username === "admin" && credentials.password === "pass") {
      setIsLoggedIn(true);
    } else {
      alert("Invalid username or password");
    }
  };

  const handleEventCreation = async (e) => {
    e.preventDefault();

    if (!newEvent.tickets || isNaN(newEvent.tickets) || newEvent.tickets <= 0) {
      alert("Please enter a valid number of tickets.");
      return;
    }

    try {
      // Send a POST request to the backend to save the event
      const response = await axios.post("http://localhost:5000/api/events", newEvent);

      // Add the newly created event to the local state
      setEvents([...events, { ...response.data, id: events.length + 1 }]);

      // Reset the form
      setNewEvent({ title: "", date: "", location: "", tickets: "" });

      alert("Event Created Successfully and Saved to Database!");
    } catch (error) {
      console.error("Error creating event:", error);
      alert("Failed to create the event. Please try again.");
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

            {/* Event List */}
            {events.length > 0 && (
              <div className="mt-5">
                <h3>Created Events</h3>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Title</th>
                      <th>Date</th>
                      <th>Location</th>
                      <th>Tickets</th>
                    </tr>
                  </thead>
                  <tbody>
                    {events.map((event, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{event.title}</td>
                        <td>{event.date}</td>
                        <td>{event.location}</td>
                        <td>{event.tickets}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            )}
          </>
        )}
      </Container>
    </div>
  );
};

export default AdminLoginPage;
