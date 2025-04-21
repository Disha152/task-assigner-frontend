import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { Spinner, Alert, Card, Container } from "react-bootstrap";
import { Button } from "react-bootstrap";

const CreatorSubmissions = () => {
  const { user } = useContext(AuthContext);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const res = await axios.get(
          "https://task-assigner-backend-8184.onrender.com/api/submissions/creator/my-submissions",
          {
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
          }
        );
        setSubmissions(res.data);
      } catch (err) {
        setError("Failed to fetch submissions.");
      } finally {
        setLoading(false);
      }
    };

    if (user?.token) {
      fetchSubmissions();
    }
  }, [user]);

  return (
    <Container className="mt-4">
  <h3 className="mb-4">Task Submissions</h3>
  {loading ? (
    <Spinner animation="border" />
  ) : error ? (
    <Alert variant="danger">{error}</Alert>
  ) : submissions.length === 0 ? (
    <Alert variant="info">No submissions found.</Alert>
  ) : (
    submissions.map((submission) => (
      <Card key={submission._id} className="mb-3 shadow-sm">
        <Card.Body>
          <Card.Title>Task: {submission.task?.title}</Card.Title>
          <Card.Text>
            <strong>Submitted by:</strong> {submission.user?.email} <br />
            <strong>Submission:</strong> {submission.submissionText} <br />
            <strong>Submitted at:</strong>{" "}
            {new Date(submission.createdAt).toLocaleString()}
          </Card.Text>
          <div className="d-flex justify-content-end">
            <Button
              variant="success"
            
            >
              Make Payment
            </Button>
          </div>
        </Card.Body>
      </Card>
    ))
  )}
</Container>
  );
};

export default CreatorSubmissions;
