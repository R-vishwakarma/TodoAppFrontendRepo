import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Alert, Card, Spinner } from "react-bootstrap";
import { loginUser } from "../../services/authService";

const NewLoginForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null); // Clear previous messages
    setLoading(true);

    try {
      const response = await loginUser(formData);
      setMessage({
        text: response?.message || "Login successful!",
        type: "success",
      });

      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        navigate("/dashboard"); // Redirect to dashboard
      }, 1500);

    } catch (error) {
      setMessage({
        text: error.message || "Login failed! Please check your credentials.",
        type: "danger",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-4 mx-auto mt-5" style={{ maxWidth: "400px" }}>
      <Card.Body>
        <Card.Title className="text-center mb-4">Login</Card.Title>
        <Form onSubmit={handleSubmit}>
          {message && <Alert variant={message.type}>{message.text}</Alert>}

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
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
              placeholder="Enter your password"
            />
          </Form.Group>

          <Button variant="dark" type="submit" style={{ width: "100%" }} disabled={loading}>
            {loading ? (
              <>
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default NewLoginForm;
