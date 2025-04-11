import React, { useState, useContext } from 'react';
import { applyToTask } from '../../services/taskService'; // ✅ Named import
import { AuthContext } from '../../context/AuthContext'; // Assuming you use context to get token

const ApplyTaskModal = ({ taskId, onClose }) => {
  const [coverLetter, setCoverLetter] = useState('');
  const { token } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await applyToTask(taskId, token); // ✅ Use the named function directly
      alert('Applied successfully!');
      if (onClose) onClose();
    } catch (error) {
      console.error('Error applying to task:', error);
      alert('Failed to apply.');
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
