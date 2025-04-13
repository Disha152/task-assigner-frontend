import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Button, Container, Spinner } from "react-bootstrap";
import axios from "axios";

const ReviewApplications = () => {
  const { id } = useParams(); // taskId
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApplications = async () => {
    try {
      const res = await axios.get(
        `https://task-assigner-backend-8184.onrender.com/api/tasks/${id}/applications`
      );
      setApplicants(res.data);
    } catch (err) {
      console.error("Error fetching applicants:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [id]);

  const approveUser = async (userId) => {
    try {
      const token = JSON.parse(localStorage.getItem("user"))?.token;
      const res = await axios.post(
        `https://task-assigner-backend-8184.onrender.com/api/tasks/${id}/approve`,
        { userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(res.data.message);
      fetchApplications(); // refresh list
    } catch (err) {
      console.error("Approval error:", err);
      alert("Could not approve applicant.");
    }
  };

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <h2 className="mb-4">Applications for Task</h2>
      {applicants.length === 0 ? (
        <p>No applications yet.</p>
      ) : (
        applicants.map((applicant) => (
          <Card key={applicant._id} className="mb-3 shadow-sm">
            <Card.Body>
              <h5>{applicant.name}</h5>
              <p>Email: {applicant.email}</p>
              <Button
                onClick={() => approveUser(applicant._id)}
                variant="success"
              >
                Approve
              </Button>
            </Card.Body>
          </Card>
        ))
      )}
    </Container>
  );
};

export default ReviewApplications;
