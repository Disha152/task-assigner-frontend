// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Card, Button, Container, Row, Col, Spinner } from 'react-bootstrap';

// const TaskReviewPage = ({ taskId }) => {
//   const [applicants, setApplicants] = useState([]);
//   const [assignedTo, setAssignedTo] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const fetchApplicants = async () => {
//     try {
//       const res = await axios.get(`/api/tasks/${taskId}/review-applications`);
//       setApplicants(res.data.applicantsQueue);
//       setAssignedTo(res.data.assignedTo);
//       setLoading(false);
//     } catch (err) {
//       console.error(err);
//       setLoading(false);
//     }
//   };

//   const assignUser = async (userId) => {
//     try {
//       const res = await axios.post(`/api/tasks/${taskId}/assign/${userId}`);
//       alert(res.data.message);
//       fetchApplicants(); // refresh the UI
//     } catch (err) {
//       console.error(err);
//       alert('Error assigning user');
//     }
//   };

//   useEffect(() => {
//     fetchApplicants();
//   }, []);
//   if (loading) {
//     return (
//       <Container className="text-center mt-5">
//         <Spinner animation="border" />
//       </Container>
//     );
//   }

//   return (
//     <Container className="mt-4">
//       <h2 className="mb-4">Review Applicants</h2>
//       {applicants.length === 0 ? (
//         <p>No applicants in the queue.</p>
//       ) : (
//         <Row>
//           {applicants.map(({ user, appliedAt }, index) => (
//             <Col key={user._id} md={6} lg={4} className="mb-4">
//               <Card className="shadow-sm h-100">
//                 <Card.Body>
//                   <Card.Title>{user.name}</Card.Title>
//                   <Card.Text>
//                     <strong>Email:</strong> {user.email} <br />
//                     <strong>Skills:</strong> {user.skills?.join(', ') || 'N/A'} <br />
//                     <strong>Applied:</strong> {new Date(appliedAt).toLocaleString()}
//                   </Card.Text>
//                   {assignedTo === user._id ? (
//                     <Button variant="success" disabled>
//                       Assigned ✅
//                     </Button>
//                   ) : (
//                     <Button variant="primary" onClick={() => assignUser(user._id)}>
//                       Assign
//                     </Button>
//                   )}
//                 </Card.Body>
//               </Card>
//             </Col>
//           ))}
//         </Row>
//       )}
//     </Container>
//   );
// };

// export default TaskReviewPage;
import React, { useEffect, useState } from "react";
import { Card, Button, Container, Row, Col, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";

const TaskReviewPage = () => {
  const { taskId } = useParams();
  const [applicants, setApplicants] = useState([]);
  const [assignedTo, setAssignedTo] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchApplicants = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `https://task-assigner-backend-8184.onrender.com/api/tasks/${taskId}/review-applications`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (res.ok) {
        console.log("Applicants Queue:", data.applicantsQueue);
        setApplicants(data.applicantsQueue);
        setAssignedTo(data.assignedTo);
      } else {
        alert(data.message || "Error fetching applications");
      }
    } catch (err) {
      console.error("Fetching applications failed:", err);
      alert("Something went wrong while fetching applications.");
    } finally {
      setLoading(false);
    }
  };

  const assignUser = async (userId) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `https://task-assigner-backend-8184.onrender.com/api/tasks/${taskId}/assign/${userId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert(data.message);
        fetchApplicants(); // Refresh after assigning
      } else {
        alert(data.message || "Error assigning user");
      }
    } catch (err) {
      console.error("Assigning user failed:", err);
      alert("Something went wrong while assigning user.");
    }
  };

  useEffect(() => {
    fetchApplicants();
  }, []);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Review Applicants</h2>
      {applicants.length === 0 ? (
        <p>No applicants in the queue.</p>
      ) : (
        <Row>
          {applicants.map(({ user, appliedAt }, index) => (
            <Col key={user._id || index} md={6} lg={4} className="mb-4">
              <Card className="shadow-sm h-100">
                <Card.Body>
                  <Card.Title>{user.name}</Card.Title>
                  <Card.Text>
                    <strong>Email:</strong> {user.email} <br />
                    <strong>Skills:</strong>{" "}
                    {user.skills?.join(", ") || "N/A"} <br />
                    <strong>Applied:</strong>{" "}
                    {new Date(appliedAt).toLocaleString()}
                  </Card.Text>
                  {assignedTo === user._id ? (
                    <Button variant="success" disabled>
                      Assigned ✅
                    </Button>
                  ) : (
                    <Button variant="primary" onClick={() => assignUser(user._id)}>
                      Assign
                    </Button>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default TaskReviewPage;
