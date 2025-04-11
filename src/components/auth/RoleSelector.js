import React, { useContext } from 'react';
import { RoleContext } from '../../context/RoleContext';

const RoleSelector = () => {
  const { role, setRole } = useContext(RoleContext);

  const handleChange = (e) => {
    setRole(e.target.value);
  };

  return (
    <div className="mb-3">
      <label className="form-label">Select Role:</label>
      <select value={role} onChange={handleChange} className="form-control">
        <option value="executor">Executor</option>
        <option value="admin">Admin</option>
      </select>
    </div>
  );
};

export default RoleSelector;
