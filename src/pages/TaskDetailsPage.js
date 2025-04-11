import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Card, Spinner, Badge, Button, Form } from "react-bootstrap";
import axios from "axios";
import { FaStar } from "react-icons/fa";

const TaskDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // ✅ Moved here
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(
          `https://task-assigner-backend-8184.onrender.com/api/tasks/${id}`
        );
        setTask(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching task:", error);
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  const handleApply = async (taskId) => {
    const userData = localStorage.getItem("user");
    const token = userData ? JSON.parse(userData).token : null;

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

      if (!response.ok) {
        throw new Error(data.message || "Application failed.");
      }

      alert(data.message);
    } catch (error) {
      console.error("Apply Error:", error);
      alert(error.message || "Something went wrong while applying.");
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

  return (
    <Container className="py-5">
      <Card className="shadow p-4 border-0">
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
              onClick={() => {
                alert("Comment submitted!");
                setComment("");
              }}
            >
              Submit Comment
            </Button>
          </Form>
        </div>

        <div className="d-flex flex-column gap-3 mt-3">
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
            variant="primary"
            style={{
              backgroundColor: "white",
              borderColor: "#5624d0",
              color: "#5624d0",
              width: "100%",
            }}
          >
            Submit the Task
          </Button>
        </div>
      </Card>
    </Container>
  );
};

export default TaskDetail;
