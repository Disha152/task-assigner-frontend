import React, { useEffect, useState } from "react";
import { Container, Card, Spinner, Badge, Button } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";

const MyTasksPage = () => {
  const [myTasks, setMyTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyTasks = async () => {
      const userData = localStorage.getItem("user");
      const token = userData ? JSON.parse(userData).token : null;

      if (!token) {
        alert("You must be logged in to view your tasks.");
        return;
      }

      try {
        const response = await axios.get(
          "https://task-assigner-backend-8184.onrender.com/api/tasks/my-tasks",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMyTasks(response.data);
      } catch (error) {
        console.error("Failed to fetch my tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyTasks();
  }, []);

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <h2 className="mb-4 fw-bold text-primary">My Tasks</h2>
      {myTasks.length === 0 ? (
        <p>You haven't been assigned or taken any tasks yet.</p>
      ) : (
        myTasks.map((task) => (
          <Card key={task._id} className="mb-3 shadow-sm p-3">
            <h4 className="fw-semibold">{task.title}</h4>
            <p className="text-muted">
              Posted on: {new Date(task.createdAt).toLocaleDateString()}
            </p>
            <p>{task.description}</p>
            <div className="mb-2">
              <strong>Budget:</strong> ₹{task.budget}
            </div>
            <div className="mb-2">
              <strong>Deadline:</strong>{" "}
              {new Date(task.deadline).toLocaleDateString()}
            </div>
            <div className="mb-2">
              <strong>Status:</strong>{" "}
              <Badge bg={task.status === "completed" ? "success" : "warning"}>
                {task.status}
              </Badge>
            </div>
            <Link
              to={`/task/${task._id}`}
              className="btn btn-outline-primary mt-2"
            >
              View Details
            </Link>
          </Card>
        ))
      )}
    </Container>
  );
};

export default MyTasksPage;
