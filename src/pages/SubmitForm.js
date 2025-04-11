import React, { useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Container, Form, Button, Alert, Spinner } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";

const SubmitTaskForm = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [submissionText, setSubmissionText] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!submissionText.trim()) {
      setErrorMsg("Submission text cannot be empty.");
      return;
    }

    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const res = await axios.post(
        `https://task-assigner-backend-8184.onrender.com/api/submissions/${taskId}`,
        { submissionText },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setSuccessMsg("Task submitted successfully!");
      setSubmissionText("");
      setTimeout(() => navigate(`/tasks/${taskId}`), 2000);
    } catch (err) {
      console.error("Submission error:", err);
      setErrorMsg(
        err.response?.data?.message || "Failed to submit task. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container style={{ maxWidth: "600px", marginTop: "2rem" }}>
      <h3 className="mb-4">Submit Your Task</h3>

      {successMsg && <Alert variant="success">{successMsg}</Alert>}
      {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="submissionText" className="mb-3">
          <Form.Label>Submission</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            value={submissionText}
            onChange={(e) => setSubmissionText(e.target.value)}
            placeholder="Write your solution or explanation here..."
          />
        </Form.Group>

        <Button type="submit" variant="primary" disabled={loading}>
          {loading ? (
            <>
              <Spinner animation="border" size="sm" /> Submitting...
            </>
          ) : (
            "Submit Task"
          )}
        </Button>

        <Link to={`/`} className="btn btn-secondary ms-2">
          Cancel
        </Link>
      </Form>
    </Container>
  );
};

export default SubmitTaskForm;
