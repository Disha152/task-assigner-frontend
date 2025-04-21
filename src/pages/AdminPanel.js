import React from 'react';
import UserList from '../components/admin/UserList';
import DisputeManager from '../components/admin/DisputeManager';
import TaskMonitor from '../components/admin/TaskMonitor';
import { FaUsers, FaExclamationTriangle, FaClipboardCheck } from 'react-icons/fa';


const AdminPanel = () => {
  return (
    <div
      style={{
        backgroundColor: "#f4f6fa",
        minHeight: "100vh",
        padding: "40px 20px",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      {/* Admin Dashboard Header */}
      <h1
        className="text-center mb-5"
        style={{
          fontWeight: 700,
          fontSize: "2.8rem",
          background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
          WebkitBackgroundClip: "text", // For webkit browsers
          color: "transparent", // Makes the text transparent to show the gradient
        }}
      >
        Admin Dashboard
      </h1>

       {/* Dashboard Summary */}
       <div className="row mb-5 text-center">
        <div className="col-md-4 mb-3">
          <div style={{
            background: "linear-gradient(to right, #4facfe, #00f2fe)",
            borderRadius: "16px",
            padding: "25px",
            color: "#fff",
            boxShadow: "0 8px 16px rgba(0,0,0,0.1)"
          }}>
            <FaUsers size={30} className="mb-2" />
            <h4>Manage Users</h4>
            <p className="mb-0">Add, edit, or remove users</p>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div style={{
            background: "linear-gradient(to right, #f7971e, #ffd200)",
            borderRadius: "16px",
            padding: "25px",
            color: "#333",
            boxShadow: "0 8px 16px rgba(0,0,0,0.1)"
          }}>
            <FaExclamationTriangle size={30} className="mb-2" />
            <h4>Handle Disputes</h4>
            <p className="mb-0">Resolve conflicts & reports</p>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div style={{
            background: "linear-gradient(to right, #43e97b, #38f9d7)",
            borderRadius: "16px",
            padding: "25px",
            color: "#fff",
            boxShadow: "0 8px 16px rgba(0,0,0,0.1)"
          }}>
            <FaClipboardCheck size={30} className="mb-2" />
            <h4>Task Monitor</h4>
            <p className="mb-0">Track all task activities</p>
          </div>
        </div>
      </div>

      <div className="container mt-5">
        {/* User List Section */}
        <div
          className="card mb-4 shadow-sm border-0"
          style={{ borderRadius: "12px", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)" }}
        >
          
            {/* <h4 className="mb-0">Users</h4> */}
          </div>
          <div className="card-body">
            {/* User List Component */}
            <UserList />
          </div>

          {/* Task Monitor Section */}
        <div
          className="card mb-4 shadow-sm border-0"
          style={{ borderRadius: "12px", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)" }}
        >
          
          </div>
          <div className="card-body">
            {/* Task Monitor Component */}
            <TaskMonitor />
          </div>
        

        {/* Dispute Manager Section */}
        <div
          className="card mb-4 shadow-sm border-0"
          style={{ borderRadius: "12px", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)" }}
        >
         
          </div>
          <div className="card-body">
            {/* Dispute Manager Component */}
            <DisputeManager />
          </div>
      

        
        </div>
      </div>
    
  );
};

export default AdminPanel;
