import React, { useEffect, useState } from 'react';
import { Card, Spinner, Badge, Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const PersonalDetails = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newSkills, setNewSkills] = useState('');
  const [newInterests, setNewInterests] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setNewSkills(parsedUser.skills?.join(', ') || '');
      setNewInterests(parsedUser.interests?.join(', ') || '');
    }
    setLoading(false);
  }, []);

  const handleSave = async () => {
    try {
      const updatedUser = await axios.put(
        'https://task-assigner-backend-8184.onrender.com/api/users/update-profile',
        {
          skills: newSkills.split(',').map((s) => s.trim()),
          interests: newInterests.split(',').map((i) => i.trim())
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        }
      );
      setUser(updatedUser.data.user);
      localStorage.setItem('user', JSON.stringify(updatedUser.data.user));
      setShowModal(false);
    } catch (error) {
      console.error('Error updating skills/interests:', error);
    }
  };

  if (loading || !user) {
    return (
      <div className="d-flex justify-content-center align-items-center mt-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <Card className="shadow p-4 rounded">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center">
            <Card.Title className="mb-0" style={{ fontSize: '1.8rem', fontWeight: '600' }}>
              Personal Details
            </Card.Title>
            <i
              className="bi bi-pencil-square text-primary fs-5 cursor-pointer"
              style={{ cursor: 'pointer' }}
              onClick={() => setShowModal(true)}
              title="Edit Skills & Interests"
            ></i>
          </div>
          <hr />
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> <Badge bg="info" text="dark">{user.role}</Badge></p>

          <p><strong>Skills:</strong></p>
          {user.skills && user.skills.length > 0 ? (
            <div className="mb-3">
              {user.skills.map((skill, idx) => (
                <Badge key={idx} bg="secondary" className="me-2 mb-2">{skill}</Badge>
              ))}
            </div>
          ) : <p className="text-muted">No skills added</p>}

          <p><strong>Interests:</strong></p>
          {user.interests && user.interests.length > 0 ? (
            <div>
              {user.interests.map((interest, idx) => (
                <Badge key={idx} bg="primary" className="me-2 mb-2">{interest}</Badge>
              ))}
            </div>
          ) : <p className="text-muted">No interests added</p>}
        </Card.Body>
      </Card>

      {/* Modal for Editing */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Skills & Interests</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Skills (comma-separated)</Form.Label>
              <Form.Control
                type="text"
                value={newSkills}
                onChange={(e) => setNewSkills(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Interests (comma-separated)</Form.Label>
              <Form.Control
                type="text"
                value={newInterests}
                onChange={(e) => setNewInterests(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleSave}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PersonalDetails;
