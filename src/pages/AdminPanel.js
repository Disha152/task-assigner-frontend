import React from 'react';
import UserList from '../components/admin/UserList';
import DisputeManager from '../components/admin/DisputeManager';
import TaskMonitor from '../components/admin/TaskMonitor'; 

const AdminPanel = () => {
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-5">👩‍💼 Admin Dashboard</h1>

      {/* User List Section */}
      <div className="card mb-4 shadow-sm">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">Users</h4>
        </div>
        <div className="card-body">
          <UserList />
        </div>
      </div>

      {/* Dispute Manager Section */}
      <div className="card mb-4 shadow-sm">
        <div className="card-header bg-warning text-dark">
          <h4 className="mb-0">Dispute Management</h4>
        </div>
        <div className="card-body">
          <DisputeManager />
        </div>
      </div>

      {/* Task Monitor Section (Optional) */}
      <div className="card mb-4 shadow-sm">
        <div className="card-header bg-success text-white">
          <h4 className="mb-0">Task Monitor</h4>
        </div>
        <div className="card-body">
          <TaskMonitor />
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
