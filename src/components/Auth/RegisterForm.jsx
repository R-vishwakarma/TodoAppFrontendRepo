import React, { useState } from "react";
import { Form, Button, Card, Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import { registerUser } from "../../services/authService";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState(null); // Using message for success or error
  const [loading, setLoading] = useState(false); // Loading state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setMessage({ text: "Passwords do not match!", type: "danger" });
      return;
    }

    // Exclude confirmPassword before sending to API
    const { confirmPassword, ...payload } = formData;

    setLoading(true); // Start loading spinner

    try {
      const response = await registerUser(payload); // Send only username, email, and password
      setMessage({ text: response.message, type: "success" });

      // Redirect to home page after 2 seconds
      setTimeout(() => {
        navigate("/"); // Redirect to home page
      }, 2000); // 2 seconds delay
    } catch (error) {
      setMessage({
        text: error.message || "An error occurred!",
        type: "danger",
      });
    } finally {
      setLoading(false); // Stop loading spinner once the process is complete
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Row>
        <Col>
          <Card className="shadow" style={{ width: "25rem" }}>
            <Card.Body>
              <Card.Title className="text-center">Register</Card.Title>
              {message && (
                <Alert variant={message.type} className="text-center">
                  {message.text}
                </Alert>
              )}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="Password (8-50 characters)"
                    minLength={8}
                    maxLength={50}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    placeholder="Confirm your password"
                  />
                </Form.Group>
                <Button variant="dark" type="submit" className="w-100" disabled={loading}>
                  {loading ? (
                    <>
                      <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                      Registering...
                    </>
                  ) : (
                    "Register"
                  )}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterForm;
