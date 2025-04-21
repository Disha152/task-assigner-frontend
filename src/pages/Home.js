import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col, Button, Card, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { Player } from "@lottiefiles/react-lottie-player";
import CountUp from "react-countup";
import animationOne from "../assets/1.json";
import animationTwo from "../assets/header.json";
import animationThree from "../assets/3.json";
import userIcon from "../assets/user.svg";
import taskIcon from "../assets/task.svg";
import earningIcon from "../assets/earning.svg";
import trendingImage from '../assets/trending_tasks.png';
import recommendedImage from '../assets/recommendations.png';
import bestSellerImage from '../assets/bestseller.png';
import ContactUs from '../assets/contact-us.png';
import InfiniteCarousel from "./InfiniteCarousel"; 
import InfiniteCarouselAlt from "./InfiniteCarouselAlt";





import { FaTasks, FaUsers, FaAward } from 'react-icons/fa';
import { FaRocket, FaUserFriends , FaMoneyBillWave} from "react-icons/fa";
import { FaCheckCircle, FaBolt, FaLightbulb } from 'react-icons/fa';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';



import "./Home.css";






const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);
  const [categories, setCategories] = useState([]);
  const [skills,setSkills] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));
const currentUserId = user?._id;
const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("https://task-assigner-backend-8184.onrender.com/api/tasks");
        setTasks(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setLoading(false);
      }
    };
    
    fetchTasks();
  }, []);
  

   // Fetch unique categories
   useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://task-assigner-backend-8184.onrender.com/api/tasks/aggregations");
        const data = await response.json();
        setCategories(data.uniqueCategories);  // Store unique categories in the state
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []); // Empty dependency array means it runs once when the component mounts

  const isUrgent = (deadline) => {
    const now = new Date();
    const due = new Date(deadline);
    const diff = (due - now) / (1000 * 60 * 60 * 24);
    return diff <= 3;
  };

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch("https://task-assigner-backend-8184.onrender.com/api/tasks/aggregations");
        const data = await response.json();
        setSkills(data.uniqueSkills); // make sure your backend returns 'uniqueSkills'
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };
  
    fetchSkills();
  }, []);
  

  const getStatusColor = (status) => {
    switch (status) {
      case "open": return "success";
      case "assigned": return "success";
      case "completed": return "primary";
      case "rejected": return "danger";
      default: return "secondary";
    }
  };
  return (
    <div style={{ backgroundColor: "#f7f9fa", minHeight: "40vh" }}>
    

  {/* Hero Section */}
<div className="hero-section position-relative text-light" style={{
  background: "radial-gradient(circle at top left, #001f3f, #001122)",
  minHeight: "20vh",
  overflow: "hidden",
  fontFamily: "'Poppins', sans-serif"
}}>
  <Container>
    <Row className="align-items-center" style={{ minHeight: "20vh" }}>
    <Col md={6} data-aos="fade-right">
  {/* Hero Headline */}
  <h1 className="fira-sans-bold" style={{
  fontSize: "3.2rem",
  lineHeight: "1.2",
  color: "#fff",
  letterSpacing: "0.5px",
  textShadow: "1px 1px 2px rgba(0,0,0,0.25)",
  paddingBottom: "10px"
}}>
  Your Gateway to <span style={{
    background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    display: "inline-block",
    fontSize: "3.2rem",
    fontFamily: "'Fira Sans', sans-serif",
    fontWeight: 700,
    letterSpacing: "0.5px"
  }}>Epic Tasks</span>
</h1>



  <h3 className="fira-sans-regular" style={{
    fontSize: "1.2rem",
    color: "#cdddf7",
    marginTop: "20px"
  }}>
    All the tasks you need in one place
  </h3>

  <div style={{
  background: "rgba(255, 255, 255, 0.1)",
  borderRadius: "16px",
  padding: "20px",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(255,255,255,0.2)",
  marginTop: "40px",
  color: "#fff"
}}>
  <div className="d-flex align-items-center mb-3 fira-sans-regular" style={{
    fontSize: "1rem",
    lineHeight: "1.6",
    letterSpacing: "0.3px"
  }}>
    <FaRocket className="me-2" color="#4facfe" size={20} />
    <h7>Launch your skills with real-world tasks</h7>
  </div>
  <div className="d-flex align-items-center mb-3 fira-sans-regular" style={{
    fontSize: "1rem",
    lineHeight: "1.6",
    letterSpacing: "0.3px"
  }}>
    <FaUserFriends className="me-2" color="#00f2fe" size={20} />
    <h7>Connect with task creators & collaborators</h7>
  </div>
  <div className="d-flex align-items-center mb-1 fira-sans-regular" style={{
    fontSize: "1rem",
    lineHeight: "1.6",
    letterSpacing: "0.3px"
  }}>
    <FaCheckCircle className="me-2" color="#90f7ec" size={20} />
    <h7>Track achievements & earn recognition</h7>
  </div>
</div>


  {/* Live Stat */}
  <div className="fira-sans-regular" style={{ marginTop: "15px", fontSize: "0.95rem", color: "#7cb8f5" }}>
    🚀 <strong className="fira-sans-semibold">2,351</strong> tasks completed today by doers like you!
  </div>

  {/* CTA Button */}
  <Button as={Link} to="/browse-tasks" className="mt-4 fira-sans-semibold"
    style={{
      padding: "12px 28px",
      fontSize: "1.1rem",
      background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
      border: "none",
      fontWeight: "600"
    }}>
    Browse Tasks
  </Button>
</Col>


      {/* Animation */}
      <Col md={6} className="text-center d-none d-md-block" data-aos="fade-left">
        <Player
          autoplay
          loop
          src={animationTwo}
          style={{
            height: '500px',
            width: '500px',
            transform: "translateY(-50px)"
          }}
        />
      </Col>
    </Row>
  </Container>
  
</div>

  
<Container className="py-5 fade-in text-center trending-container">
<div className="d-flex justify-content-center align-items-center" style={{ marginBottom: '50px', marginTop: '20px' }}>
    <img src={trendingImage} alt="Trending" style={{ width: '32px', height: '32px', marginRight: '10px' }} />
    <h2 className="section-heading m-0 fira-sans-bold">Trending Tasks</h2>
  </div>
  
<div className="infinite-carousel-wrapper py-3">
  <div className="infinite-carousel">
    {[...tasks, ...tasks].filter((task) => ['approved', 'assigned', 'completed','open'].includes(task.status))
.map((task, index) => (
      <div key={`${task._id}-${index}`} className="task-card-wrapper">
        <Link
          to={`/task/${task._id}`}
          className="text-decoration-none"
        >
          <Card className="task-card-custom glass-card shadow-sm">
            <Card.Body className="d-flex flex-column justify-content-between text-start">
              <div>
              <Card.Title className="d-flex justify-content-between align-items-center fira-sans-semibold text-dark">
  {task.title.length > 25 ? `${task.title.slice(0, 25)}...` : task.title}
  {isUrgent(task.deadline) && <Badge bg="danger">Urgent</Badge>}
</Card.Title>

<Card.Text className="fira-sans-regular text-dark">
  {task.description.length > 80 ? `${task.description.slice(0, 80)}...` : task.description}
</Card.Text>

                <div className="mb-2">
                  {task.skills?.[0] && (
                    <Badge bg="info" className="me-2">{task.skills[0]}</Badge>
                  )}
                  {task.status && (
                    <Badge bg={getStatusColor(task.status)}>{task.status}</Badge>
                  )}
                </div>
              </div>

              <div>
                <p className="mb-1 text-dark"><strong>Budget:</strong> ₹{task.budget}</p>
                <p className="mb-0 text-dark"><strong>Deadline:</strong> {new Date(task.deadline).toLocaleDateString()}</p>
              </div>
            </Card.Body>
          </Card>
        </Link>
      </div>
    ))}
  </div>
</div>

</Container>

<Container className="py-5 fade-in text-center trending-container">
<div className="d-flex justify-content-center align-items-center" style={{ marginBottom: '50px', marginTop: '20px' }}>
    <img src={recommendedImage} alt="Trending" style={{ width: '32px', height: '32px', marginRight: '10px' }} />
    <h2 className="section-heading m-0 fira-sans-bold">Category Based Tasks</h2>
  </div>
  
 {/* Add the InfiniteCarousel here */}
 <InfiniteCarousel categories={categories} /> {/* Pass categories as a prop to the InfiniteCarousel component */}

</Container>




<Container className="py-5 fade-in text-center trending-container">
<div className="d-flex justify-content-center align-items-center" style={{ marginBottom: '50px', marginTop: '20px' }}>
    <img src={bestSellerImage} alt="Trending" style={{ width: '32px', height: '32px', marginRight: '10px' }} />
    <h2 className="section-heading m-0 fira-sans-bold">Skills Based Tasks</h2>
  </div>
  
  <InfiniteCarouselAlt skills={skills} />


</Container>

     

      {/* CTA Section */}
<div className="cta-section" style={{ backgroundColor: "#fff", padding: "60px 0", fontFamily: "'Poppins', sans-serif" }}>
  <Container>
    <Row className="align-items-center">
      {/* Text Content */}
      <Col md={6} data-aos="fade-right">
        <h2 className="mb-3" style={{ fontWeight: "700", fontSize: "2.2rem", color: "#222" }}>
          Start Your Task Journey Today
        </h2>
        <p style={{ fontSize: "1.1rem", color: "#555", lineHeight: "1.6" }}>
          Join a thriving community of doers, learners, and achievers. Discover tasks that grow your skills, unlock new opportunities, and build your portfolio.
        </p>

        {/* Feature List with Icons */}
        <div style={{ marginTop: "30px" }}>
          <div className="d-flex align-items-start mb-3">
            <FaTasks size={24} color="#ff8c00" className="me-3 mt-1" />
            <span style={{ fontSize: "1rem", color: "#333" }}>Gain access to exclusive tasks</span>
          </div>
          <div className="d-flex align-items-start mb-3">
            <FaUsers size={24} color="#007bff" className="me-3 mt-1" />
            <span style={{ fontSize: "1rem", color: "#333" }}>Collaborate and learn with others</span>
          </div>
          <div className="d-flex align-items-start mb-3">
            <FaAward size={24} color="#28a745" className="me-3 mt-1" />
            <span style={{ fontSize: "1rem", color: "#333" }}>Track progress and earn badges</span>
          </div>
          <div className="d-flex align-items-start mb-3">
            <FaRocket size={24} color="#e83e8c" className="me-3 mt-1" />
            <span style={{ fontSize: "1rem", color: "#333" }}>Get noticed by top recruiters</span>
          </div>
        </div>

        {/* Testimonial */}
        <div style={{
          marginTop: "30px",
          backgroundColor: "#f8f9fa",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 2px 6px rgba(0, 0, 0, 0.05)",
          fontStyle: "italic",
          color: "#555"
        }}>
          “I started with one task and ended up landing my dream internship — it's a game changer!”<br />
          <span style={{ fontWeight: "bold", color: "#000", display: "block", marginTop: "10px" }}>
            – Riya S., Product Intern
          </span>
        </div>

        {/* CTA Button */}
        <Button as={Link} to="/register" className="primary-btn mt-4" style={{ fontWeight: "600", fontSize: "1rem" }}>
          Join Now
        </Button>
      </Col>

      {/* Animation Content */}
      <Col md={6} className="text-center mt-5 mt-md-0" data-aos="fade-left">
        <div>
          <Player
            autoplay
            loop
            src={animationOne}
            style={{ height: '500px', width: '500px' }}
          />
        </div>
      </Col>
    </Row>
  </Container>
</div>

{/* Achievements Section */}
<div style={{ background: "#0d1b2a", padding: "50px 0", fontFamily: "'Fira Sans', sans-serif" }}>
  <Container>
  <h2 className="fira-sans-bold text-center mb-5" style={{ color: "#fff", fontSize: "2.5rem" }}>
  Our Achievements 🎉
</h2>

    <Row className="text-center justify-content-center">
      {/* Card 1 */}
      <Col md={4} className="mb-4">
        <div style={{
          background: "rgba(255, 255, 255, 0.9)",
          borderRadius: "16px",
          padding: "30px 20px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
          transition: "transform 0.3s ease",
        }} className="hover-lift">
          <div style={{
            background: "linear-gradient(135deg, #6a11cb, #2575fc)",
            borderRadius: "50%",
            width: "70px",
            height: "70px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 20px auto"
          }}>
            <FaTasks size={32} color="#fff" />
          </div>
          <h3 className="fira-sans-bold" style={{ fontSize: "2rem", color: "#222" }}>
            <CountUp end={10234} duration={3} separator="," />+
          </h3>
          <p className="fira-sans-regular" style={{ color: "#555", marginTop: "8px" }}>Tasks Completed</p>
        </div>
      </Col>

      {/* Card 2 */}
      <Col md={4} className="mb-4">
        <div style={{
          background: "rgba(255, 255, 255, 0.9)",
          borderRadius: "16px",
          padding: "30px 20px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
          transition: "transform 0.3s ease",
        }} className="hover-lift">
          <div style={{
            background: "linear-gradient(135deg, #11998e, #38ef7d)",
            borderRadius: "50%",
            width: "70px",
            height: "70px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 20px auto"
          }}>
            <FaUsers size={32} color="#fff" />
          </div>
          <h3 className="fira-sans-bold" style={{ fontSize: "2rem", color: "#222" }}>
            <CountUp end={5731} duration={3} separator="," />+
          </h3>
          <p className="fira-sans-regular" style={{ color: "#555", marginTop: "8px" }}>Active Users</p>
        </div>
      </Col>

      {/* Card 3 */}
      <Col md={4} className="mb-4">
        <div style={{
          background: "rgba(255, 255, 255, 0.9)",
          borderRadius: "16px",
          padding: "30px 20px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
          transition: "transform 0.3s ease",
        }} className="hover-lift">
          <div style={{
            background: "linear-gradient(135deg, #f7971e, #ffd200)",
            borderRadius: "50%",
            width: "70px",
            height: "70px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 20px auto"
          }}>
            <FaMoneyBillWave size={32} color="#fff" />
          </div>
          <h3 className="fira-sans-bold" style={{ fontSize: "2rem", color: "#222" }}>
            ₹<CountUp end={8735624} duration={3} separator="," />
          </h3>
          <p className="fira-sans-regular" style={{ color: "#555", marginTop: "8px" }}>Earnings Generated</p>
        </div>
      </Col>
    </Row>
  </Container>
</div>



       {/* Contact Us Section */}
<div className="contact-section py-5" style={{ backgroundColor: '#f9f9fb' }}>
  <Container>
    <Row className="align-items-center">
   

    <h1 style={{ fontWeight: 'bold', fontSize: '3rem', color: 'black', paddingLeft: "130px" }}>Contact Us</h1>
      {/* Left Side - Info + Image */}
      <Col md={6} className="mb-4 mb-md-0 text-center text-md-start position-relative">
      
        <img
          src={ContactUs}
          alt="Purple Blob"
          style={{ position: "absolute", top: -250, left: -83, width: "80%", opacity: 1, zIndex: 0 , paddingLeft: "60px" }}
        />
        
        <div style={{ position: "relative", zIndex: 1 }}>

         
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

{/* Final Branding Section */}
<div style={{ backgroundColor: "#1f1f2e", color: "#ffffff", padding: "80px 0", textAlign: "center" }}>
  <Container>
    <h2 style={{ fontSize: "2.8rem", fontWeight: "bold", marginBottom: "20px" }}>
     A Full-Stack Task Marketplace Platform
    </h2>
    <p style={{ fontSize: "1.2rem", maxWidth: "700px", margin: "0 auto 40px auto", color: "#ccc" }}>
      <em>Where Tasks Meet Talent ✨</em>
      <br />
      A collaborative platform connecting task creators and freelancers for seamless task assignment, execution, and feedback.
    </p>

    
    
              <Player autoplay loop src={animationThree} style={{ height: '50px', width: '300px' }} />
            

    <Button
      as={Link}
      to="/register"
      size="lg"
      className="mt-4"
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        border: "none",
        padding: "12px 30px",
        fontWeight: "bold",
        borderRadius: "30px"
      }}
    >
      Get Started for Free
    </Button>
  </Container>
</div>
 

 {/* Newsletter Signup */}
 <Container className="py-5 text-center" style={{ backgroundColor: "#f5f7ff" }}>
  <h3 className="mb-3">Stay updated with latest tasks & features</h3>
  <form className="flex-md-row justify-content-center">
    {/* <input
      type="email"
      className="form-control mb-2 mb-md-0 me-md-2"
      placeholder="Enter your email"
      style={{ maxWidth: "300px" }}
    /> */}
    <Button
      type="submit"
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        border: "none",
        width:  "max-content",
      }}
    >
      Subscribe
    </Button>
  </form>
</Container>


    </div>

  );
};

export default Home;


