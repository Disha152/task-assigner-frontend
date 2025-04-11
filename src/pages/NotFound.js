import React from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container
      className="d-flex flex-column justify-content-center align-items-center py-5"
      style={{ minHeight: "80vh" }}
    >
      <h1
        style={{
          fontSize: "6rem",
          fontWeight: "900",
          color: "#5624d0",
        }}
      >
        404
      </h1>
      <p className="lead">Oops! Page not found.</p>
      <Button
        onClick={() => navigate("/")}
        style={{
          backgroundColor: "#5624d0",
          borderColor: "#5624d0",
        }}
      >
        Go to Home
      </Button>
    </Container>
  );
};

export default NotFound;
