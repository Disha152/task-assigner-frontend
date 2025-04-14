import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Container, Row, Col, Spinner, Badge } from "react-bootstrap";

const AllTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get("https://task-assigner-backend-8184.onrender.com/api/tasks");
        setTasks(res.data);
      } catch (err) {
        console.error("Error fetching tasks:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  return (
    <Container className="py-4">
      <h2 className="mb-4 text-center">All Tasks</h2>
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <Row>
          {tasks.map((task) => (
            <Col md={6} lg={4} key={task._id} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>{task.title}</Card.Title>
                  <Card.Text>
                    <strong>Created By:</strong> {task.creator?.name || "Unknown"}
                  </Card.Text>
                  <div>
                    {task.skills?.map((skill, idx) => (
                      <Badge bg="secondary" className="me-1" key={idx}>
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default AllTasks;
