
// import React, { useState, useContext } from "react";
// import axios from "axios";
// import { Container, Form, Button, Alert, Row, Col } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext"; // ✅ import AuthContext

// const RegisterPage = () => {
//   const { handleLogin } = useContext(AuthContext); // ✅ use handleLogin
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");

//     try {
//       const res = await axios.post(
//         "https://task-assigner-backend-8184.onrender.com/api/auth/register",
//         { name, email, password },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       // ✅ use login function after registration
//       if (res.data.token) {
//         await handleLogin(email, password); // call login with same creds
//       }

//       setSuccess("Registration successful! Redirecting...");
//       setTimeout(() => {
//         navigate("/");
//       }, 1000);
//     } catch (err) {
//       if (err.response && err.response.data) {
//         setError(err.response.data.message || "Registration failed");
//       } else {
//         setError("Registration failed. Please try again.");
//       }
//     }
//   };

//   return (
//     <Container className="d-flex align-items-center justify-content-center min-vh-100">
//       <div
//         style={{
//           maxWidth: "400px",
//           width: "100%",
//           background: "#fff",
//           padding: "2rem",
//           borderRadius: "10px",
//           boxShadow: "0 0 10px rgba(0,0,0,0.1)",
//         }}
//       >
//         <h3 className="text-center fw-bold mb-4">Create your account</h3>

//         {error && <Alert variant="danger">{error}</Alert>}
//         {success && <Alert variant="success">{success}</Alert>}

//         <Form onSubmit={handleSubmit}>
//           <Form.Group controlId="name" className="mb-3">
//             <Form.Label>Name</Form.Label>
//             <Form.Control
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//               size="lg"
//             />
//           </Form.Group>

//           <Form.Group controlId="email" className="mb-3">
//             <Form.Label>Email</Form.Label>
//             <Form.Control
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               size="lg"
//             />
//           </Form.Group>

//           <Form.Group controlId="password" className="mb-3">
//             <Form.Label>Password</Form.Label>
//             <Form.Control
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               size="lg"
//             />
//           </Form.Group>

//           <Button
//             type="submit"
//             className="w-100 fw-bold"
//             style={{ backgroundColor: "#5624d0", borderColor: "#5624d0" }}
//             size="lg"
//           >
//             Register
//           </Button>
//         </Form>

//         <div className="text-center mt-3 mb-3">
//           <span>──────── Or sign up with ────────</span>
//         </div>

//         <Row className="justify-content-center gap-2 mb-4">
//           <Col xs="auto">
//             <Button variant="outline-secondary" size="lg">
//               <i className="bi bi-google" />
//             </Button>
//           </Col>
//           <Col xs="auto">
//             <Button variant="outline-secondary" size="lg">
//               <i className="bi bi-facebook" />
//             </Button>
//           </Col>
//           <Col xs="auto">
//             <Button variant="outline-secondary" size="lg">
//               <i className="bi bi-apple" />
//             </Button>
//           </Col>
//         </Row>

//         <div className="text-center">
//           <p>
//             Already have an account?{" "}
//             <a href="/login" className="fw-bold text-decoration-none">
//               Log in
//             </a>
//           </p>
//         </div>
//       </div>
//     </Container>
//   );
// };

// export default RegisterPage;
import React, { useState, useContext } from "react";
import axios from "axios";
import { Container, Form, Button, Alert, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const RegisterPage = () => {
  const { handleLogin } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // default role
  const [skills, setSkills] = useState(""); // skills input
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await axios.post(
        "https://task-assigner-backend-8184.onrender.com/api/auth/register",
        { name, email, password, role, skills },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data.token) {
        await handleLogin(email, password);
      }

      setSuccess("Registration successful! Redirecting...");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || "Registration failed");
      } else {
        setError("Registration failed. Please try again.");
      }
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100">
      <div
        style={{
          maxWidth: "420px",
          width: "100%",
          background: "#fff",
          padding: "2rem",
          borderRadius: "12px",
          boxShadow: "0 0 15px rgba(0,0,0,0.1)",
        }}
      >
        <h3 className="text-center fw-bold mb-4">Create your account</h3>

        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="name" className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              size="lg"
            />
          </Form.Group>

          <Form.Group controlId="email" className="mb-3">
            <Form.Label>Email</Form.Label>
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

          <Form.Group controlId="role" className="mb-3">
            <Form.Label>Register As</Form.Label>
            <div>
              <Form.Check
                inline
                type="radio"
                label="User"
                name="role"
                value="user"
                checked={role === "user"}
                onChange={(e) => setRole(e.target.value)}
              />
              <Form.Check
                inline
                type="radio"
                label="Creator"
                name="role"
                value="creator"
                checked={role === "creator"}
                onChange={(e) => setRole(e.target.value)}
              />
            </div>
          </Form.Group>

          <Form.Group controlId="skills" className="mb-3">
            <Form.Label>Skills</Form.Label>
            <Form.Control
              type="text"
              // placeholder="e.g. React, Python, UI Design"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              size="lg"
            />
          </Form.Group>

          <Button
            type="submit"
            className="w-100 fw-bold"
            style={{ backgroundColor: "#5624d0", borderColor: "#5624d0" }}
            size="lg"
          >
            Register
          </Button>
        </Form>

        <div className="text-center mt-3 mb-3">
          <span>──────── Or sign up with ────────</span>
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
            Already have an account?{" "}
            <a href="/login" className="fw-bold text-decoration-none">
              Log in
            </a>
          </p>
        </div>
      </div>
    </Container>
  );
};

export default RegisterPage;
