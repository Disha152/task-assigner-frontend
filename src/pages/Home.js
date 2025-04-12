import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Card, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { Player } from "@lottiefiles/react-lottie-player";
import CountUp from "react-countup";
import animationOne from "../assets/1.json";
import animationTwo from "../assets/2.json";
import userIcon from "../assets/user.svg";
import taskIcon from "../assets/task.svg";
import earningIcon from "../assets/earning.svg";

import blobPurple from "../assets/blob_purple.svg";
import { motion } from "framer-motion";
import "./Home.css";
import contactSVG from '../assets/3.svg';


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

  const isUrgent = (deadline) => {
    const now = new Date();
    const due = new Date(deadline);
    const diff = (due - now) / (1000 * 60 * 60 * 24);
    return diff <= 3;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "open": return "success";
      case "assigned": return "warning";
      case "completed": return "primary";
      case "rejected": return "danger";
      default: return "secondary";
    }
  };

  return (
    <div style={{ backgroundColor: "#f7f9fa", minHeight: "100vh" }}>
      {/* Hero Section */}
      <div className="hero-section d-flex align-items-center fade-in" style={{ minHeight: "50vh" }}>
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <h1>All the tasks you need, in one place</h1>
              <p>Discover, apply, and manage tasks efficiently with Task Assigner.</p>
              <Button as={Link} to="/browse-tasks" className="primary-btn mt-3">
                Browse Tasks
              </Button>
            </Col>
            <Col md={6} className="text-center">
              <Player autoplay loop src={animationOne} style={{ height: '450px', width: '450px' }} />
            </Col>
          </Row>
        </Container>
      </div>

      {/* Featured Tasks Section */}
      <Container className="py-5 fade-in">
        <h2 className="section-heading text-center">Featured Tasks</h2>
        {loading ? (
          <Row className="g-4">
            {[...Array(4)].map((_, index) => (
              <Col key={index} sm={12} md={6} lg={3}>
                <div className="skeleton-card glass-effect">
                  <div className="skeleton-title"></div>
                  <div className="skeleton-text"></div>
                  <div className="skeleton-badge"></div>
                  <div className="skeleton-button"></div>
                </div>
              </Col>
            ))}
          </Row>
        ) : tasks.length === 0 ? (
          <p className="text-center">No tasks available at the moment.</p>
        ) : (
          <Row className="g-4">
            {tasks.map((task, index) => (
              <Col key={index} sm={12} md={6} lg={3}>
                <div className="hover-wrapper">
                  <Card className="h-100 card-custom border-0 shadow-sm glass-effect fade-in">
                    <Card.Body>
                      <Card.Title className="d-flex justify-content-between align-items-center">
                        {task.title}
                        {isUrgent(task.deadline) && (
                          <Badge bg="danger" className="ms-2">Urgent</Badge>
                        )}
                      </Card.Title>

                      <Card.Text>{task.description.slice(0, 60)}...</Card.Text>

                      <div className="mb-2">
                        {task.skills?.[0] && (
                          <Badge bg="info" className="me-2">{task.skills[0]}</Badge>
                        )}
                        {task.status && (
                          <Badge bg={getStatusColor(task.status)}>{task.status}</Badge>
                        )}
                      </div>

                      <div className="mt-2">
                        <p><strong>Budget:</strong> ₹{task.budget}</p>
                        <p><strong>Deadline:</strong> {new Date(task.deadline).toLocaleDateString()}</p>
                      </div>

                      <Button
                        as={Link}
                        to={`/task/${task._id}`}
                        variant="outline-primary"
                        className="custom-outline-btn mt-2"
                      >
                        View Task
                      </Button>
                    </Card.Body>
                  </Card>
                </div>
              </Col>
            ))}
          </Row>
        )}
      </Container>

    
      {/* CTA Section */}
      <div className="cta-section" style={{ backgroundColor: "#fff", padding: "60px 0" }}>
        <Container>
          <Row className="align-items-center">
            <Col md={6} data-aos="fade-right">
              <h2>Start your task journey today</h2>
              <p>Sign up and gain access to hundreds of exciting opportunities.</p>
              <Button as={Link} to="/register" className="primary-btn mt-3">
                Join Now
              </Button>
            </Col>
            <Col md={6} className="text-center">
              <Player autoplay loop src={animationTwo} style={{ height: '400px', width: '400px' }} />
            </Col>

          </Row>
        </Container>
      </div>

      {/* Achievement Stats Section */}
      <div className="stats-section text-center py-5" style={{ backgroundColor: '#ede7f6' }}>
        <Container>
          {/* <h2 className="section-heading mb-5">Platform Achievements</h2> */}
          <Row className="justify-content-center">
            <Col md={4} className="mb-4">
              <img src={userIcon} alt="Users" width={50} className="mb-2" />
              <h3><CountUp end={2000} duration={2} />+</h3>
              <p>Users</p>
            </Col>
            <Col md={4} className="mb-4">
              <img src={taskIcon} alt="Tasks" width={50} className="mb-2" />
              <h3><CountUp end={500} duration={2} />+</h3>
              <p>Tasks Completed</p>
            </Col>
            <Col md={4} className="mb-4">
              <img src={earningIcon} alt="Earnings" width={50} className="mb-2" />
              <h3><CountUp end={500000} duration={2} prefix="₹" separator="," /></h3>
              <p>Earnings Distributed</p>
            </Col>
          </Row>
        </Container>
      </div>

       {/* Contact Us Section */}
<div className="contact-section py-5" style={{ backgroundColor: '#f9f9fb' }}>
  <Container>
    <Row className="align-items-center">
   


      {/* Left Side - Info + Image */}
      <Col md={6} className="mb-4 mb-md-0 text-center text-md-start position-relative">
        <img
          src={blobPurple}
          alt="Purple Blob"
          style={{ position: "absolute", top: -200, left: -90, width: "80%", opacity: 0.3, zIndex: 0 , paddingLeft: "60px" }}
        />
        <img
          src={blobPurple}
          alt="Purple Blob"
          style={{ position: "absolute", top: -200, left: -120, width: "95%", opacity: 0.8, zIndex: 0 , paddingLeft: "150px"}}
        />
        <div style={{ position: "relative", zIndex: 1 }}>
        <h1 style={{ fontWeight: 'bold', fontSize: '2.5rem', color: 'white', paddingLeft: "150px" }}>Contact Us</h1>

          {/* <p className="text-muted">
            Have questions or feedback? We'd love to hear from you.
            Fill out the form and we'll get in touch!
          </p> */}
        </div>
      </Col>

      {/* Right Side - Form */}
      <Col md={6}>
        <form style={{ backgroundColor: "#fff", padding: "30px", borderRadius: "12px", boxShadow: "0 4px 10px rgba(0,0,0,0.05)" }}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" id="name" placeholder="Your Name" />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" placeholder="name@example.com" />
          </div>
          <div className="mb-3">
            <label htmlFor="message" className="form-label">Message</label>
            <textarea className="form-control" id="message" rows="4" placeholder="Type your message..."></textarea>
          </div>
          <Button
  type="submit"
  style={{
    background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
    border: "none",
    color: "#fff"
  }}
>
  Send Message
</Button>

        </form>
      </Col>
    </Row>
  </Container>
</div>

    </div>

  );
};

export default Home;


