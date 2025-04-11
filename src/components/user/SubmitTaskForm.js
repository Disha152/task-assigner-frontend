import React, { useState } from 'react';
import {
  getAllTasks,
  getTaskById,
  createTask,
  applyToTask,
  submitTask,
  reviewSubmission
} from '../../services/taskService';

const SubmitTaskForm = ({ taskId, onSubmitted }) => {
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await taskService.submitTask(taskId, description);
    setDescription('');
    onSubmitted();
  };

  return (
    <form onSubmit={handleSubmit} className="mt-3">
      <div className="mb-3">
        <label htmlFor="description" className="form-label">Submission Description</label>
        <textarea
          id="description"
          className="form-control"
          rows="5"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">Submit Task</button>
    </form>
  );
};

export default SubmitTaskForm;
