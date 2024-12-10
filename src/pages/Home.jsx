// Home.js
import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavBeforeLogin from "../components/NavBeforeLogin";


const Home = () => {
  return (
    <div>
      {/* Navbar */}
      <NavBeforeLogin />

      {/* Main Content Section with padding to avoid overlap */}
      <Container className="my-5" style={{ paddingTop: "70px" }}> {/* Adjust padding based on navbar height */}
        {/* Welcome Section */}
        <Row className="mb-4">
          <Col className="text-center">
            <h1>Welcome to Your Todo Manager</h1>
            <p>Manage your tasks efficiently with simple and powerful features!</p>
          </Col>
        </Row>

        {/* App Features Section */}
        <Row className="mb-4 justify-content-center">
          {/* Login Section */}
          <Col md={5} lg={4} className="mb-4">
            <Card className="shadow-lg">
              <Card.Body>
                <Card.Title className="text-center">Login</Card.Title>
                <Card.Text className="text-center">
                  Log in to access your personal task manager and start organizing your tasks.
                </Card.Text>
                <div className="d-grid gap-2">
                  <Link to="/login">
                    <Button variant="outline-dark" size="lg" className="w-100">
                      Login
                    </Button>
                  </Link>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Register Section */}
          <Col md={5} lg={4} className="mb-4">
            <Card className="shadow-lg">
              <Card.Body>
                <Card.Title className="text-center">Register</Card.Title>
                <Card.Text className="text-center">
                  New to the app? Sign up and start managing your tasks right away.
                </Card.Text>
                <div className="d-grid gap-2">
                  <Link to="/register">
                    <Button variant="outline-dark" size="lg" className="w-100">
                      Register
                    </Button>
                  </Link>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
