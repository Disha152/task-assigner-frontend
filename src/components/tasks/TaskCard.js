import React from 'react';

const TaskCard = ({ task, onClick }) => {
  return (
    <div className="card mb-3" onClick={() => onClick(task._id)} style={{ cursor: 'pointer' }}>
      <div className="card-body">
        <h5 className="card-title">{task.title}</h5>
        <p className="card-text">{task.description}</p>
        <p className="card-text"><small className="text-muted">Status: {task.status}</small></p>
      </div>
    </div>
  );
};

export default TaskCard;
