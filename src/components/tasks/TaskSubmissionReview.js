import React, { useEffect, useState } from 'react';
import {
  getAllTasks,
  getTaskById,
  createTask,
  applyToTask,
  submitTask,
  reviewSubmission
} from '../../services/taskService';

const TaskSubmissionReview = () => {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const fetchSubmissions = async () => {
      const res = await taskService.getPendingSubmissions();
      setSubmissions(res.data);
    };
    fetchSubmissions();
  }, []);

  const handleDecision = async (id, accepted) => {
    await taskService.reviewSubmission(id, accepted);
    setSubmissions(prev => prev.filter(sub => sub._id !== id));
  };

  return (
    <div className="container mt-4">
      <h3>Review Submissions</h3>
      {submissions.length === 0 ? (
        <p>No pending submissions.</p>
      ) : (
        submissions.map(sub => (
          <div key={sub._id} className="card mb-3">
            <div className="card-body">
              <h5>{sub.task.title}</h5>
              <p><strong>Submitted by:</strong> {sub.executor.username}</p>
              <p>{sub.description}</p>
              <button className="btn btn-success me-2" onClick={() => handleDecision(sub._id, true)}>Accept</button>
              <button className="btn btn-danger" onClick={() => handleDecision(sub._id, false)}>Reject</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TaskSubmissionReview;
