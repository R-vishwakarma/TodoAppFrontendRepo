import React from "react";
import { Container, Navbar } from "react-bootstrap";
import '../styles/Footer.css'; // Import custom CSS for Footer (if needed)

const Footer = () => {
  return (
    <Navbar bg="black" variant="dark" className="footer-custom" fixed="bottom">
      <Container className="justify-content-center">
        <Navbar.Text className="text-light footer-text">
          © {new Date().getFullYear()} Todo Application. All rights reserved.
        </Navbar.Text>
      </Container>
    </Navbar>
  );
};

export default Footer;
