import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";

const NavbarComponent =() =>{
    return (
    <Navbar bg="dark" variant="dark" expand="lg">
      
        <Container>
          <Navbar.Brand>
            {/* Placeholder for Logo and Name */}
            <span style={{ fontSize: "24px", fontWeight: "bold" }}><img src= ""alt="Description "/></span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#events">Events</Nav.Link>
              <Nav.Link href="#tickets">Tickets</Nav.Link>
              <Nav.Link href="#admin">Admin Login</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

    );
};

export default NavbarComponent;
