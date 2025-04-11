import React, { useState, useContext } from "react";
import { Container, Form, Button, Alert , Row ,Col} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";



const LoginPage = () => {
  const { handleLogin } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
const navigate = useNavigate();

const onSubmit = async (e) => {
  e.preventDefault();
  setError("");

  try {
    await handleLogin(email, password);
    navigate("/"); // or "/dashboard" if you have one
  } catch (err) {
    setError(err.response?.data?.message || "Login failed. Please try again.");
  }
};


  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100">
      <div
        style={{
          maxWidth: "400px",
          width: "100%",
          background: "#fff",
          padding: "2rem",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        }}
      >
        <h3 className="text-center fw-bold mb-4">
          Log in to continue your learning journey
        </h3>

        {/* {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>} */}

        <Form onSubmit={onSubmit}>
          <Form.Group controlId="email" className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              size="lg"
            />
          </Form.Group>

          <Form.Group controlId="password" className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              size="lg"
            />
          </Form.Group>

{error && <Alert variant="danger">{error}</Alert>}

          <Button
            type="submit"
            className="w-100 fw-bold"
            style={{ backgroundColor: "#5624d0", borderColor: "#5624d0" }}
            size="lg"
          >
            Login
          </Button>
        </Form>

        <div className="text-center mt-3 mb-3">
          <span>──────── Other login options ────────</span>
        </div>

        <Row className="justify-content-center gap-2 mb-4">
          <Col xs="auto">
            <Button variant="outline-secondary" size="lg">
              <i className="bi bi-google" />
            </Button>
          </Col>
          <Col xs="auto">
            <Button variant="outline-secondary" size="lg">
              <i className="bi bi-facebook" />
            </Button>
          </Col>
          <Col xs="auto">
            <Button variant="outline-secondary" size="lg">
              <i className="bi bi-apple" />
            </Button>
          </Col>
        </Row>

        <div className="text-center">
          <p>
            Don't have an account?{" "}
            <a href="/register" className="fw-bold text-decoration-none">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </Container>
  );
};

export default LoginPage;

