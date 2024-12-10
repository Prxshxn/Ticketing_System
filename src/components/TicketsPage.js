import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import NavbarComponent from "./NavbarComponent";
import FooterComponent from "./FooterComponent";

const TicketsPage = () => {
  const tickets = [
    { id: 1, event: "Music Fest", price: "$50" },
    { id: 2, event: "Art Exhibit", price: "$30" },
  ];

  return (
    <div>
      <NavbarComponent />
      <Container className="mt-5">
        <h2 className="text-center mb-4">Tickets</h2>
        <Row>
          {tickets.map(ticket => (
            <Col md={6} key={ticket.id} className="mb-3">
              <div className="d-flex justify-content-between">
                <div>{ticket.event}</div>
                <div>{ticket.price}</div>
                <Button variant="success">Buy Now</Button>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
      <FooterComponent />
    </div>
  );
};

export default TicketsPage;


