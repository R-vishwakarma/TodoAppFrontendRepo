import React, { useState, useEffect } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import TokenService from "../services/tokenService";
import '../styles/Navbar.css'; 


const NavScrollExample = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedIn(TokenService.isAuthenticated());
  }, []);

  const handleLogout = () => {
    TokenService.removeToken();
    setLoggedIn(false);
    navigate("/"); // Redirect to home page
  };

  return (
    <Navbar expand="lg" className="navbar-custom">
      <Container fluid>
        <Navbar.Brand
          as={Link}
          to="/"
          className="navbar-brand-custom"
        >
          TodoApp
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" className="justify-content-center">
          <Nav className="me-auto my-2 my-lg-0 navbar-links">
            <Nav.Link as={Link} to="/" className="navbar-item">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/dashboard" className="navbar-item">
              Dashboard
            </Nav.Link>
            {loggedIn && (
              <Nav.Link as={Link} to="/add-todo" className="navbar-item">
                Add Todo
              </Nav.Link>
            )}
          </Nav>

          <Nav className="justify-content-center">
            {!loggedIn ? (
              <>
                <Nav.Link as={Link} to="/login" className="navbar-item">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register" className="navbar-item">
                  Register
                </Nav.Link>
              </>
            ) : (
              <Nav.Link
                as="button"
                onClick={handleLogout}
                className="navbar-logout"
              >
                Logout
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavScrollExample;
