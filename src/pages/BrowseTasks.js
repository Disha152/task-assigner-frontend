// src/pages/BrowseTasks.js
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import "../pages/BrowseTasks.css"; // optional custom CSS

const BrowseTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllTasks = async () => {
      try {
        const response = await axios.get("https://task-assigner-backend-8184.onrender.com/api/tasks");
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllTasks();
  }, []);

  return (
    <div style={{ backgroundColor: "#f7f9fa", minHeight: "100vh", paddingTop: "40px" }}>
      <Container>
        <h1 className="text-center mb-5 fw-bold text-dark">Browse All Tasks</h1>

        {loading ? (
          <div className="text-center my-5">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : tasks.length === 0 ? (
          <p className="text-center">No tasks found.</p>
        ) : (
          <Row className="g-4">
            {tasks.map((task) => (
              <Col key={task._id} sm={12} md={6} lg={4} xl={3}>
                <Card className="h-100 shadow-sm border-0 task-card">
                  <Card.Body>
                    <Card.Title className="task-title">{task.title}</Card.Title>
                    <Card.Text className="text-muted">
                      {task.description.length > 80
                        ? task.description.slice(0, 80) + "..."
                        : task.description}
                    </Card.Text>
                    <p><strong>Budget:</strong> ₹{task.budget}</p>
                    <p><strong>Deadline:</strong> {new Date(task.deadline).toLocaleDateString()}</p>
                    <Button
                      as={Link}
                      to={`/task/${task._id}`}
                      variant="outline-primary"
                      className="w-100 mt-2"
                    >
                      View Details
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
};

export default BrowseTasks;
