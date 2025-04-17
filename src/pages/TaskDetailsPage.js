


import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Card, Spinner, Badge, Button, Form } from "react-bootstrap";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import './taskDetailsPage.css';



const TaskDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const { user } = useContext(AuthContext);
  const [applicants, setApplicants] = useState([]);
  const [showApplicants, setShowApplicants] = useState(false);
  const [submissions, setSubmissions] = useState([]);
  const [showSubmissions, setShowSubmissions] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showDisputeModal, setShowDisputeModal] = useState(false);
const [disputeReason, setDisputeReason] = useState("");


  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(`https://task-assigner-backend-8184.onrender.com/api/tasks/${id}`);
        setTask(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching task:", error);
        setLoading(false);
      }
    };

    const fetchComments = async () => {
      try {
        const userData = localStorage.getItem("user");
        if (!userData) return;
        const token = JSON.parse(userData)?.token;
        if (!token) return;

        const response = await axios.get(
          `https://task-assigner-backend-8184.onrender.com/api/tasks/${id}/comments`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchTask();
    fetchComments();
  }, [id]);

  useEffect(() => {
    if (user?.token) {
      checkIfSaved();
    }
  }, [user, id]);

  const checkIfSaved = async () => {
    const token = user?.token;
    if (!token) return;
    try {
      const response = await axios.get(
        `https://task-assigner-backend-8184.onrender.com/api/users/saved`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const savedIds = response.data.map((task) => task._id);
      setIsSaved(savedIds.includes(id));
    } catch (err) {
      console.error("Failed to check saved status:", err);
    }
  };

  const handleSave = async () => {
    const token = user?.token;
    if (!token) {
      alert("Please login first");
      return;
    }

    try {
      if (isSaved) {
        await axios.delete(
          `https://task-assigner-backend-8184.onrender.com/api/users/unsave/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setIsSaved(false);
      } else {
        await axios.post(
          `https://task-assigner-backend-8184.onrender.com/api/users/save/${id}`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setIsSaved(true);
      }
    } catch (error) {
      console.error("Save/Unsave failed:", error);
      alert("Something went wrong while saving the task.");
    }
  };

  const handleApply = async (taskId) => {
    const token = user?.token;
    if (!token) {
      alert("You must be logged in to apply for a task.");
      return;
    }

    try {
      const response = await fetch(
        `https://task-assigner-backend-8184.onrender.com/api/tasks/${taskId}/apply`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Application failed.");
      alert(data.message);
    } catch (error) {
      alert(error.message || "Something went wrong while applying.");
    }
  };

  const fetchApplicants = async () => {
    try {
      const response = await axios.get(`https://task-assigner-backend-8184.onrender.com/api/tasks/${id}/applications`);
      setApplicants(response.data);
      setShowApplicants(true);
    } catch (err) {
      alert("Failed to fetch applications.");
    }
  };

  const fetchSubmissions = async () => {
    try {
      const response = await axios.get(`https://task-assigner-backend-8184.onrender.com/api/tasks/${id}/submissions`);
      setSubmissions(response.data);
      setShowSubmissions(true);
    } catch (err) {
      alert("Failed to fetch submissions.");
    }
  };

  const approveApplicant = async (userId) => {
    const confirmApproval = window.confirm("Are you sure you want to approve this applicant?");
    if (!confirmApproval) return;

    try {
      await axios.post(`https://task-assigner-backend-8184.onrender.com/api/tasks/${id}/approve/${userId}`);
      alert("User approved!");
      setApplicants((prev) => prev.filter((app) => app._id !== userId));
    } catch (err) {
      alert("Failed to approve user.");
    }
  };

  const handleCommentSubmit = async () => {
    if (!comment.trim()) {
      alert("Comment cannot be empty.");
      return;
    }

    const token = user?.token;
    if (!token) {
      alert("You must be logged in to submit a comment.");
      return;
    }

    try {
      const response = await axios.post(
        `https://task-assigner-backend-8184.onrender.com/api/tasks/${id}/comment`,
        { comment },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        setComment("");
        alert("Comment submitted successfully!");
      }
    } catch (error) {
      alert("Failed to submit the comment.");
    }
  };

  const handleRaiseDispute = async () => {
    if (!disputeReason.trim()) {
      alert("Please provide a reason for the dispute.");
      return;
    }
  
    try {
      const response = await axios.post(
        `https://task-assigner-backend-8184.onrender.com/api/disputes/raise`,
        {
          taskId: id,
          reason: disputeReason,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      alert(response.data.message);
      setDisputeReason("");
      setShowDisputeModal(false);
    } catch (error) {
      console.error("Dispute Error:", error);
      alert("Failed to raise dispute.");
    }
  };
  

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (!task) {
    return (
      <Container className="text-center py-5">
        <p>Task not found.</p>
      </Container>
    );
  }

  const isCreator = user?.user?._id && task?.creator?._id && user.user._id === task.creator._id;

  return (
    
    <Container className="py-5">
      <Card className="shadow p-4 border-0 position-relative">

        <div className="custom-buttons-container">
  {/* Save Button */}
  <Button
    className="custom-save-btn"
    onClick={handleSave}
    disabled={!user}
  >
    {isSaved ? "Unsave" : "Save"}
  </Button>

  {/* Raise Dispute Button */}
  <Button
    className="raise-dispute-btn"
    onClick={() => setShowDisputeModal(true)}
    disabled={!user}
  >
    Raise Dispute
  </Button>
</div>


        <h2 className="fw-bold mb-3 text-primary">{task.title}</h2>
        <p className="text-muted">{new Date(task.createdAt).toLocaleDateString()}</p>

        <div className="mb-4">
          <strong>Description:</strong>
          <p>{task.description}</p>

          <strong>Budget:</strong>
          <p>₹{task.budget}</p>

          <strong>Deadline:</strong>
          <p>{new Date(task.deadline).toLocaleDateString()}</p>

          <strong>Required Skills:</strong>
          <div className="mb-2">
            {task.skills.map((skill, index) => (
              <Badge key={index} bg="secondary" className="me-2">
                {skill}
              </Badge>
            ))}
          </div>

          <strong>Status:</strong>
          <p className="text-capitalize">
            <Badge bg={task.status === "rejected" ? "danger" : "success"}>{task.status}</Badge>
          </p>
        </div>

        <Card className="p-3 mb-4 bg-light">
          <h5 className="fw-bold">Posted By:</h5>
          <p><strong>Name:</strong> {task.creator?.name}</p>
          <p><strong>Email:</strong> {task.creator?.email}</p>
        </Card>

        <div className="mb-4">
          <h5 className="fw-bold">Rating:</h5>
          <div style={{ color: "#f5c518" }}>
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} fill={i < 4.5 ? "#f5c518" : "#ddd"} />
            ))}
            <span className="ms-2 text-muted">4.5 / 5</span>
          </div>
        </div>

        <div className="mb-4">
          <h5 className="fw-bold">Leave a Comment</h5>
          <Form>
            <Form.Group controlId="commentBox">
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Write your thoughts here..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </Form.Group>
            <Button
              variant="primary"
              className="mt-2"
              style={{ backgroundColor: "#5624d0", borderColor: "#5624d0" }}
              onClick={handleCommentSubmit}
            >
              Submit Comment
            </Button>
          </Form>
        </div>

        <div className="mt-3">
          <h5 className="fw-bold">Previous Comments:</h5>
          {comments.length === 0 ? (
            <p>No comments yet.</p>
          ) : (
            comments.map((comment) => {
              const initials = comment.author?.name
                ? comment.author.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()
                : "U";

              const formattedDate = new Date(comment.createdAt).toLocaleString();

              return (
                <div
                  key={comment._id}
                  style={{
                    border: "1px solid #ddd",
                    borderRadius: "10px",
                    padding: "16px",
                    marginBottom: "12px",
                    display: "flex",
                    alignItems: "flex-start",
                    backgroundColor: "#fafafa",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                  }}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      backgroundColor: "#4a90e2",
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "bold",
                      fontSize: "16px",
                      marginRight: "12px",
                    }}
                  >
                    {initials}
                  </div>

                  <div>
                    <div style={{ fontWeight: "bold", fontSize: "16px", marginBottom: "4px" }}>
                      {comment.author?.name || "Unknown"}
                    </div>
                    <div style={{ fontSize: "14px", color: "#666", marginBottom: "8px" }}>
                      {formattedDate}
                    </div>
                    <div style={{ fontSize: "15px", lineHeight: "1.5", color: "#333" }}>
                      {comment.text}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="d-flex flex-column gap-3 mt-3">
          {!isCreator && (
            <>
              <Button
                onClick={() => handleApply(task._id)}
                variant="primary"
                style={{
                  backgroundColor: "#5624d0",
                  borderColor: "#5624d0",
                  width: "100%",
                }}
              >
                Apply for Task
              </Button>

              <Button
                onClick={() => navigate(`/submit-task/${task._id}`)}
                variant="outline-primary"
                style={{ width: "100%" }}
              >
                Submit the Task
              </Button>
            </>
          )}

          {isCreator && (
            <>
              <Button
                onClick={fetchApplicants}
                variant="outline-success"
                style={{ width: "100%" }}
              >
                Review Applications
              </Button>

              <Button
                onClick={fetchSubmissions}
                variant="outline-primary"
                style={{ width: "100%" }}
              >
                See All Submissions
              </Button>
            </>
          )}
        </div>
      </Card>
      {showDisputeModal && (
      <div className="modal show fade d-block" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Raise Dispute</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowDisputeModal(false)}
              ></button>
            </div>
            <div className="modal-body">
              <Form.Group>
                <Form.Label>Reason for Dispute</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={disputeReason}
                  onChange={(e) => setDisputeReason(e.target.value)}
                  placeholder="Describe the issue..."
                />
              </Form.Group>
            </div>
            <div className="modal-footer">
              <Button variant="secondary" onClick={() => setShowDisputeModal(false)}>
                Cancel
              </Button>
              <Button variant="danger" onClick={handleRaiseDispute}>
                Submit Dispute
              </Button>
            </div>
          </div>
        </div>
      </div>
    )}
    </Container>
  );
};

export default TaskDetail;

