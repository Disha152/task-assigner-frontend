import React, { useEffect, useState } from 'react';
import { Card, Spinner, Badge } from 'react-bootstrap';

const PersonalDetails = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

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
          <Card.Title className="text-center mb-4" style={{ fontSize: '1.8rem', fontWeight: '600' }}>
            Personal Details
          </Card.Title>
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
    </div>
  );
};

export default PersonalDetails;
