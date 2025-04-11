
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Card, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Home.css"; 


const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("https://task-assigner-backend-8184.onrender.com/api/tasks");
        setTasks(response.data.slice(0, 4));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div style={{ backgroundColor: "#f7f9fa", minHeight: "100vh" }}>
      {/* Hero Section */}
      <div className="text-center hero-section">
        <Container>
          <h1>All the tasks you need, in one place</h1>
          <p>Discover, apply, and manage tasks efficiently with Task Assigner.</p>
          <Button as={Link} to="/browse-tasks" className="primary-btn mt-3">
            Browse Tasks
          </Button>
        </Container>
      </div>

      {/* Featured Tasks Section */}
      <Container className="py-5">
        <h2 className="section-heading text-center">Featured Tasks</h2>
        {loading ? (
          <div className="text-center">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : tasks.length === 0 ? (
          <p className="text-center">No tasks available at the moment.</p>
        ) : (
          <Row className="g-4">
            {tasks.map((task, index) => (
              <Col key={index} sm={12} md={6} lg={3}>
                <Card className="h-100 card-custom border-0 shadow-sm">
                  <Card.Body>
                    <Card.Title>{task.title}</Card.Title>
                    <Card.Text>{task.description.slice(0, 60)}...</Card.Text>
                    <p><strong>Budget:</strong> ₹{task.budget}</p>
                    <p><strong>Deadline:</strong> {new Date(task.deadline).toLocaleDateString()}</p>
                    {/* <Button
                      as={Link}
                      to={`/task/${task._id}`}
                      variant="outline-primary"
                      className="primary-btn"
                      style={{ backgroundColor: "transparent", color: "#f2f3f5", borderColor: "#5624d0" }}
                    >
                      View Task
                    </Button> */}
                    <Button
                      as={Link}
                      to={`/task/${task._id}`}
                      variant="outline-primary"
                      className="custom-outline-btn"
                    >
                      View Task
                    </Button>

                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>

      {/* CTA Section */}
      <div className="cta-section text-center">
        <Container>
          <h2>Start your task journey today</h2>
          <p>Sign up and gain access to hundreds of exciting opportunities.</p>
          <Button as={Link} to="/register" className="primary-btn mt-3">
            Join Now
          </Button>
        </Container>
      </div>
    </div>
  );
};

export default Home;
