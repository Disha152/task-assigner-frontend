import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Container, Card, Spinner ,Badge } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";

const MySubmissions = () => {
  const { user } = useContext(AuthContext);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("https://task-assigner-backend-8184.onrender.com/api/submissions/user-submissions", {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        setSubmissions(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />;

  return (
    <Container className="py-4">
      <h3 className="mb-4">My Submissions</h3>
      {submissions.length === 0 ? (
  <p>You haven't submitted anything yet.</p>
) : (
  submissions.map((submission) => (
    <Card key={submission._id} className="mb-3 shadow-sm border-0">
      <Card.Body>
        <Card.Title className="fw-bold">{submission.task.title}</Card.Title>

        <Card.Text className="mb-2">
          <strong>Submission:</strong> {submission.submissionText}
        </Card.Text>

        <Card.Text className="mb-2">
          <strong>Status:</strong>{' '}
          {submission.isApproved ? (
            <Badge bg="success">Approved</Badge>
          ) : (
            <Badge bg="warning" text="dark">Pending</Badge>
          )}
        </Card.Text>

        <Card.Text className="text-muted">
          <small>Submitted on {new Date(submission.submittedAt).toLocaleString()}</small>
        </Card.Text>
      </Card.Body>
    </Card>
  ))
)}

    </Container>
  );
};

export default MySubmissions;
