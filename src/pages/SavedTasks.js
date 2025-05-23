import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Card, Spinner } from "react-bootstrap";
import { Link } from 'react-router-dom';


const SavedTasks = () => {
  const [savedTasks, setSavedTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("https://task-assigner-backend-8184.onrender.com/api/users/saved", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSavedTasks(res.data);
      } catch (err) {
        console.error("Failed to fetch saved tasks:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedTasks();
  }, []);

  if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />;

  return (
    <Container className="py-4">
    <h3 className="mb-4">Saved Tasks</h3>
    {savedTasks.length === 0 ? (
      <p>You have no saved tasks.</p>
    ) : (
      savedTasks.map((task, index) => (
        <div key={`${task._id}-${index}`} className="task-card-wrapper">
          <Link
            to={`/task/${task._id}`}
            className="text-decoration-none text-dark"
          >
            <Card className="mb-3 p-3">
              <h5>{task.title}</h5>
              <p>{task.description}</p>
            </Card>
          </Link>
        </div>
      ))
    )}
  </Container>
  
  );
};

export default SavedTasks;
