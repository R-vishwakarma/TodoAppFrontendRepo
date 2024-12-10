import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavBeforeLogin = () => {
  return (
    <>
      <style>
        {`
          .navbar-link {
            color: white;
            transition: color 0.3s ease;
            font-size: 1.2rem;
          }

          .navbar-link:hover {
            color: #f39c12 !important;
            text-decoration: underline;
          }
        `}
      </style>

      <Navbar expand="lg" style={{ backgroundColor: "black", position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000 }}>
        <Container fluid>
          <Navbar.Brand as={Link} to="/" style={{ color: "white", textAlign: "center", flex: 1 }}>
            TodoApp
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll" className="d-flex justify-content-center">
            <Nav className="me-auto my-2 my-lg-0" navbarScroll>
              <Nav.Link as={Link} to="/" className="navbar-link">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/login" className="navbar-link">
                Login
              </Nav.Link>
              <Nav.Link as={Link} to="/register" className="navbar-link">
                Register
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBeforeLogin;
