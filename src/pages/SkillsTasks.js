
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Card, Badge, Spinner, Alert } from "react-bootstrap";

const SkillTasksPage = () => {
  const { skill } = useParams();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTasksBySkill = async () => {
      try {
        const response = await fetch(
          `https://task-assigner-backend-8184.onrender.com/api/tasks/skills/${encodeURIComponent(skill)}`
        );
        if (!response.ok) {
          throw new Error("No tasks found for this skill.");
        }
        const data = await response.json();
        setTasks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasksBySkill();
  }, [skill]);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h3 className="mb-4">
        Tasks requiring <Badge bg="primary">{skill}</Badge>
      </h3>
      <Row>
        {tasks.map((task) => (
          <Col md={6} lg={4} className="mb-4" key={task._id}>
            {/* Wrap the task card with Link to navigate to the task detail page */}
            <Link to={`/task/${task._id}`} style={{ textDecoration: "none" }}>
              <Card className="shadow-sm h-100">
                <Card.Body>
                  <Card.Title>{task.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {task.category} — {task.subcategory}
                  </Card.Subtitle>
                  <Card.Text style={{ fontSize: "0.9rem" }}>
                    {task.description?.slice(0, 100)}...
                  </Card.Text>
                  <div>
                    {task.skills?.map((s, i) => (
                      <Badge key={i} bg="info" className="me-1">
                        {s}
                      </Badge>
                    ))}
                  </div>
                </Card.Body>
                <Card.Footer className="text-end">
                  <small className="text-muted">
                    Posted on {new Date(task.createdAt).toLocaleDateString()}
                  </small>
                </Card.Footer>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default SkillTasksPage;
