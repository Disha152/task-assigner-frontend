import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Container, Alert } from "react-bootstrap";

const CreateTaskPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [deadline, setDeadline] = useState("");
  const [skills, setSkills] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    const taskData = {
      title,
      description,
      budget: parseInt(budget),
      deadline,
      skills: skills.split(",").map((s) => s.trim()),
    };
    const creatorToken = localStorage.getItem("token");


    try {
      const response = await axios.post(
        "https://task-assigner-backend-8184.onrender.com/api/tasks",
        taskData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${creatorToken}` 
          },
        }
      );
      setMessage("Task created successfully!");
      console.log("Task:", response.data);
      // Clear form
      setTitle("");
      setDescription("");
      setBudget("");
      setDeadline("");
      setSkills("");
    } catch (err) {
      setError(
        err.response?.data?.message || "Error creating task. Please try again."
      );
    }
  };

  return (
    <Container className="py-5" style={{ maxWidth: "600px" }}>
     <h2 className="mb-4 text-center fw-bold display-5">Create New Task</h2>


      {message && <Alert variant="success">{message}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Task description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Budget (in INR)</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter budget"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Deadline</Form.Label>
          <Form.Control
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Skills (comma-separated)</Form.Label>
          <Form.Control
            type="text"
            placeholder="e.g. HTML, CSS, JS"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            required
          />
        </Form.Group>

        <Button
          type="submit"
          className="w-100"
          style={{ backgroundColor: "#5624d0", borderColor: "#5624d0" }}
        >
          Create Task
        </Button>
      </Form>
    </Container>
  );
};

export default CreateTaskPage;
