import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Card, Button, Spinner } from "react-bootstrap";
import axios from "axios";

const SubmissionList = () => {
  const { taskId } = useParams();
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSubmissions = async () => {
    try {
      const res = await axios.get(`https://task-assigner-backend-8184.onrender.com/api/tasks/${taskId}/submissions`);
      setSubmissions(res.data);
    } catch (err) {
      alert("Failed to fetch submissions.");
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (submissionId, action) => {
    try {
      await axios.post(`https://task-assigner-backend-8184.onrender.com/api/tasks/${taskId}/submissions/${submissionId}/${action}`);
      alert(`Submission ${action}ed successfully.`);
      fetchSubmissions(); // refresh list
    } catch (err) {
      alert(`Failed to ${action} submission.`);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, [taskId]);

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <h3 className="mb-4">Submissions for Task</h3>
      {submissions.length === 0 ? (
        <p>No submissions yet.</p>
      ) : (
        submissions.map((submission) => (
          <Card key={submission._id} className="mb-3 p-3">
            <p><strong>User:</strong> {submission.user?.name} ({submission.user?.email})</p>
            <p><strong>Submitted File:</strong> <a href={submission.fileUrl} target="_blank" rel="noopener noreferrer">View File</a></p>
            <p><strong>Comment:</strong> {submission.comment}</p>
            <p><strong>Status:</strong> {submission.status}</p>
            {submission.status === "pending" && (
              <div className="d-flex gap-2">
                <Button variant="success" onClick={() => handleAction(submission._id, "approve")}>Approve</Button>
                <Button variant="danger" onClick={() => handleAction(submission._id, "reject")}>Reject</Button>
              </div>
            )}
          </Card>
        ))
      )}
    </Container>
  );
};

export default SubmissionList;
