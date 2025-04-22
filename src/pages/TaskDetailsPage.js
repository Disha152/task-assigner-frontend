


import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {   Spinner, Form } from "react-bootstrap";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import './taskDetailsPage.css';
import { Container, Row, Col, Card, Button, Badge, ListGroup } from 'react-bootstrap';
import AttachmentFile from "../assets/paperclip.png";
import Comments from "../assets/comments.png";
import Learn from "../assets/learn.png";
import Requirements from "../assets/requirements.png";
import  Working from "../assets/working.json";
import Gradient from "../assets/gradient.json";
import { Player } from '@lottiefiles/react-lottie-player'; // or use lottie-react
import ReactStars from "react-rating-stars-component";





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
const [rating, setRating] = useState(0);
const [averageRating, setAverageRating] = useState(0);

 // Function to render badges for categories and subcategories
 const renderBadges = (items, badgeClass) => {
  return items.split(',').map((item, index) => (
    <span key={index} className={`badge ${badgeClass}`}>{item.trim()}</span>
  ));
};
const [liked, setLiked] = useState(false);

  const toggleLike = () => setLiked(!liked);

  useEffect(() => {
    // const fetchTask = async () => {
    //   try {
    //     const response = await axios.get(`https://task-assigner-backend-8184.onrender.com/api/tasks/${id}`);
    //     setTask(response.data);
    //     setLoading(false);
    //   } catch (error) {
    //     console.error("Error fetching task:", error);
    //     setLoading(false);
    //   }
    // };

    const fetchTask = async () => {
      try {
        const response = await axios.get(`https://task-assigner-backend-8184.onrender.com/api/tasks/${id}`);
        const fetchedTask = response.data;
    
        console.log("Fetched task data:", fetchedTask); // Optional: Debugging
    
        setTask(fetchedTask);
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
    const fetchAvgRating = async () => {
      const res = await axios.get(`/api/tasks/${taskId}/average-rating`);
      setAverageRating(res.data.averageRating);
    };
    fetchAvgRating();
  }, []);
  

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
  const token = user?.token;
if (!token) {
  alert("Please login first");
  return;
}

  const handleApply = async (taskId) => {
    try {
      const res = await fetch(`https://task-assigner-backend-8184.onrender.com/api/tasks/${taskId}/apply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Replace with actual token logic
        },
        body: JSON.stringify({
          coverLetter: "I'm very interested in this task and I believe I can do a great job!", // Optional
        }),
      });
  
      const data = await res.json();
      if (res.ok) {
        alert(data.message);
      } else {
        alert(data.message || "Error applying for task");
      }
    } catch (err) {
      console.error("Apply failed:", err);
      alert("Something went wrong while applying.");
    }
  };
  

  const fetchApplicants = async () => {
    try {
      const res = await fetch(`https://task-assigner-backend-8184.onrender.com/api/tasks/${task._id}/applications`, {
        headers: {
          Authorization: `Bearer ${token}`, // Replace with actual token logic
        },
      });
  
      const data = await res.json();
  
      if (res.ok) {
        console.log("Applicants Queue:", data.applicantsQueue);
        // You can now store it in state and render it in a modal or new section
        setApplicants(data.applicantsQueue); // Example
      } else {
        alert(data.message || "Error fetching applications");
      }
    } catch (err) {
      console.error("Fetching applications failed:", err);
      alert("Something went wrong while fetching applications.");
    }
  };
  
  const handleReviewApplications = () => {
    navigate(`/tasks/${task._id}/review-applications`);
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

  // const handleCommentSubmit = async () => {
  //   if (!comment.trim()) {
  //     alert("Comment cannot be empty.");
  //     return;
  //   }

  //   const token = user?.token;
  //   if (!token) {
  //     alert("You must be logged in to submit a comment.");
  //     return;
  //   }

  //   try {
  //     const response = await axios.post(
  //       `https://task-assigner-backend-8184.onrender.com/api/tasks/${id}/comment`,
  //       { comment },
  //       {
  //         headers: { Authorization: `Bearer ${token}` },
  //       }
  //     );
  //     if (response.status === 200) {
  //       setComment("");
  //       alert("Comment submitted successfully!");
  //     }
  //   } catch (error) {
  //     alert("Failed to submit the comment.");
  //   }
  // };
  const handleCommentSubmit = async () => {
    if (!comment.trim()) return alert("Comment is required");
    if (!rating) return alert("Please provide a rating");
  
    try {
      const res = await axios.post(`/api/tasks/${taskId}/comment`, {
        comment,
        rating
      }, {
        headers: { Authorization: `Bearer ${userToken}` }
      });
  
      // Refresh comments
      setComments([...comments, res.data.comment]);
      setComment("");
      setRating(0);
    } catch (error) {
      console.error("Error posting comment:", error);
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
    

<Container fluid className="p-4 font-fira">
      <Row>
        {/* Left Column - Main Content */}
        <Col md={8}>
        {/* <h1 className="display-5">Design a Logo for EcoStartup</h1> */}
        <h1 
  className="display-5" 
  style={{
    background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    display: "inline-block",
    fontSize: "3.2rem",
    fontFamily: "'Fira Sans', sans-serif",
    fontWeight: 700,
    letterSpacing: "0.5px"
  }}
>
{task.title}
</h1>
<h6 className="text-muted">
  Average Rating: <span className="fw-bold">{averageRating} / 5</span>
  <ReactStars
    count={5}
    value={parseFloat(averageRating)}
    edit={false}
    size={20}
    activeColor="#ffd700"
  />
</h6>


<div className="meta-info">
  Created by <strong>{task.creator?.name}</strong><small> Posted on {new Date(task.createdAt).toLocaleDateString()}</small> · <Badge bg="success">Open</Badge>
</div>


<div className="card shadow-lg mb-4" style={{ borderRadius: "12px" }}>
  <div className="row g-0">
    {/* Left Column - Text Content */}
    <div className="col-md-7 p-4">


       {/* Optional: Additional Fields */}
       <h4 className="section-header mt-4" style={{ fontSize: "1.25rem", fontWeight: "bold" }}>
        <img src={Requirements} alt="details" style={{ width: "20px", marginRight: "8px", verticalAlign: "middle" }} />
        Task Details
      </h4>
      <ul className="custom-list" style={{ paddingLeft: "20px", listStyleType: "disc" }}>
        <li><strong>Experience Level:</strong> {task.experienceLevel}</li>
        <li><strong>Time Commitment:</strong> {task.timeCommitment}</li>
        <li><strong>Deliverables:</strong> {task.deliverables}</li>
        <li><strong>Communication Expectations:</strong> {task.communicationExpectations}</li>
        <li>
          <strong>Additional Notes:</strong>{" "}
          <a href={task.additionalNotes} target="_blank" rel="noopener noreferrer">
            {task.additionalNotes}
          </a>
        </li>
      </ul>
     
      <h4 className="section-header mt-4" style={{ fontSize: "1.25rem", fontWeight: "bold" }}>
        <img src={Requirements} alt="requirements" style={{ width: "20px", marginRight: "8px", verticalAlign: "middle" }} />
        Requirements
      </h4>
      <div className="mb-2">
        {task.skills.map((skill, index) => (
          <Badge key={index} bg="secondary" className="me-2 mb-2">
            {skill}
          </Badge>
        ))}
      </div>

      {task?.attachments && task.attachments.length > 0 && (
        <div className="task-attachments mb-4">
          <h4
            className="section-header mt-4"
            style={{ fontSize: "1.25rem", fontWeight: "bold" }}
          >
            <img
              src={AttachmentFile}
              alt="attachment"
              style={{
                width: "20px",
                marginRight: "8px",
                verticalAlign: "middle",
              }}
            />
            Attachments
          </h4>
          <ul
            className="attachments-list"
            style={{ paddingLeft: "20px", listStyleType: "none" }}
          >
            {task.attachments.map((file, index) => (
              <li key={index}>
                <a href={file} target="_blank" rel="noopener noreferrer">
                  {file}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
       <h4 className="section-header" style={{ fontSize: "1.25rem", fontWeight: "bold" }}>
        <img src={Learn} alt="learn" style={{ width: "20px", marginRight: "8px", verticalAlign: "middle" }} />
        What you’ll learn
      </h4>
      <ul className="custom-list" style={{ paddingLeft: "20px", listStyleType: "disc" }}>
        <li>How to think creatively</li>
        <li>Communicating ideas visually</li>
        <li>Problem-solving through design</li>
        <li>Working on real-world projects</li>
      </ul>

     
    </div>


    {/* Right Column - Lottie Animation */}
    <div className="col-md-5 d-flex align-items-center justify-content-center p-4">
      <Player
        autoplay
        loop
        src={Working}
        style={{ height: '400px', width: '100%',paddingRight:"10px" }}
      />
    </div>
  </div>
</div>


<h4 className="section-header">
  <img
    src={Comments}
    alt="attachment"
    style={{ width: "20px", marginRight: "8px", verticalAlign: "middle" }}
  />
  Comments & Ratings
</h4>

{/* Rating Section */}
<div className="mb-4">

  </div>


{/* Comment Form */}
<div className="mb-4">

  <h5 className="fw-bold">Leave a Comment</h5>
  <div className="mb-3">
  <label className="form-label fw-bold">Your Rating</label>
  <ReactStars
    count={5}
    size={30}
    value={rating}
    onChange={(newRating) => setRating(newRating)}
    activeColor="#ffd700"
  />
</div>

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

{/* Comments List */}
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
          <div style={{ display: "flex", alignItems: "center", marginBottom: "6px" }}>
  <span className="me-2 fw-bold">{comment.author?.name || "Unknown"}</span>
  <ReactStars
    count={5}
    value={comment.rating || 0}
    edit={false}
    size={16}
    activeColor="#ffd700"
  />
</div>

            <div
              style={{
                fontWeight: "bold",
                fontSize: "16px",
                marginBottom: "4px",
              }}
            >
              {comment.author?.name || "Unknown"}
            </div>
            <div
              style={{
                fontSize: "14px",
                color: "#666",
                marginBottom: "8px",
              }}
            >
              {formattedDate}
            </div>
            <div
              style={{
                fontSize: "15px",
                lineHeight: "1.5",
                color: "#333",
              }}
            >
              {comment.text}
            </div>
          </div>
        </div>
      );
    })
  )}
</div>



          {/* More comments would go here */}
          <hr />
        </Col>
        

        {/* Right Column - Sidebar */}
      
        <Col md={4}>
          <div className="position-sticky" style={{ top: '80px' }}>
             {/* Gradient Lottie Bar */}
    <div style={{ height: '8px', overflow: 'hidden', borderRadius: '8px 8px 0 0' }}>
      <Player
        autoplay
        loop
        src={Gradient}
        style={{
          height: '100%',
          width: '100%',
        }}
      />
    </div>
            <Card className="bg-dark text-white"  style={{ borderTopLeftRadius: "0px", borderTopRightRadius: "0px" }}> 
              
              <Card.Body>
                <Row className="align-items-center mb-3">
      <Col>
        <h2 className="mb-0">Description</h2>
        
      </Col>
      <Col xs="auto">
  <i
    className={`fas fa-heart fa-2x ${isSaved ? 'text-pink' : 'text-outline'}`}
    onClick={() => {
      if (user) {
        handleSave();
      }
    }}
    style={{
      cursor: user ? 'pointer' : 'not-allowed',
      opacity: user ? 1 : 0.5,
      transition: '0.3s',
    }}
    title={user ? (isSaved ? "Unsave" : "Save") : "Login to save"}
  ></i>
</Col>

    </Row>
                <h7>{task.description}</h7>
               

                
                <div className="mt-3 mb-4">
  <ListGroup variant="flush" className="text-white">
    <ListGroup.Item className="bg-dark text-white border-0 px-0 d-flex justify-content-between">
      <strong>Deadline:</strong>
      <span>{new Date(task.deadline).toLocaleDateString()}</span>
    </ListGroup.Item>
    <ListGroup.Item className="bg-dark text-white border-0 px-0 d-flex justify-content-between">
      <strong>Applicants:</strong>
      <span>{task.applicantCount}</span>
    </ListGroup.Item>
    <ListGroup.Item className="bg-dark text-white border-0 px-0 d-flex justify-content-between">
      <strong>Budget:</strong>
      <span>₹{task.budget}</span>
    </ListGroup.Item>
    <ListGroup.Item className="bg-dark text-white border-0 px-0 d-flex justify-content-between">
      <strong>Assigned:</strong>
      <span>{task.assignedTo?.name || "Not assigned"}</span>
    </ListGroup.Item>
  </ListGroup>
</div>

{!isCreator && (
  <>
    <Button
      onClick={() => handleApply(task._id)}
      variant="light"
      className="w-100 mb-2 fw-bold"
    >
      Apply Now
    </Button>

    <Button
      onClick={() => navigate(`/submit-task/${task._id}`)}
      variant="outline-light"
      className="w-100 mb-2"
    >
      Submit Task
    </Button>
  </>
)}

                <Button
  variant="outline-danger"
  className="w-100 mb-2 "
  onClick={() => setShowDisputeModal(true)}
  disabled={!user}
  title={!user ? "Login to raise a dispute" : ""}
>
  Raise Dispute
</Button>

              </Card.Body>
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
            
          </div>

          
        </Col>
      </Row>
      

    </Container>
    
  );
};

export default TaskDetail;


