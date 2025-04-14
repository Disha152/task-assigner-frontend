import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Table, Spinner } from "react-bootstrap";

const AllSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const res = await axios.get("https://task-assigner-backend-8184.onrender.com/api/submissions");
        setSubmissions(res.data);
      } catch (err) {
        console.error("Error fetching submissions:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSubmissions();
  }, []);

  return (
    <Container className="py-4">
      <h2 className="mb-4 text-center">All Submissions</h2>
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : submissions.length === 0 ? (
        <p>No submissions found.</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Task</th>
              <th>Submitted By</th>
              <th>Submission Link</th>
              <th>Submitted At</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((submission, index) => (
              <tr key={submission._id}>
                <td>{index + 1}</td>
                <td>{submission.task?.title || "N/A"}</td>
                <td>{submission.user?.name || "Anonymous"}</td>
                <td>
                  <a href={submission.submissionLink} target="_blank" rel="noopener noreferrer">
                    View
                  </a>
                </td>
                <td>{new Date(submission.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default AllSubmissions;
