import React, { useState, useContext } from 'react';
import { applyToTask } from '../../services/taskService';
import { AuthContext } from '../../context/AuthContext';

const ApplyTaskModal = ({ taskId, onClose }) => {
  const [coverLetter, setCoverLetter] = useState('');
  const { token } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await applyToTask(taskId, token, coverLetter); 
      alert(response.message);
      if (onClose) onClose();
    } catch (error) {
      console.error('Error applying to task:', error);
      alert(error.response?.data?.message || 'Failed to apply.');
    }
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Optional cover letter"
          value={coverLetter}
          onChange={(e) => setCoverLetter(e.target.value)}
        />
        <button type="submit">Apply</button>
      </form>
    </div>
  );
};

export default ApplyTaskModal;
