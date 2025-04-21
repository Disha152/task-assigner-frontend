

import React from 'react';
import UserList from '../components/admin/UserList';
import DisputeManager from '../components/admin/DisputeManager';
import TaskMonitor from '../components/admin/TaskMonitor';
import { FaUsers, FaExclamationTriangle, FaClipboardCheck } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
  const navigate = useNavigate();

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
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        Admin Dashboard
      </h1>

      {/* Dashboard Summary Cards */}
      <div className="row mb-5 text-center">
       

        <div className="col-md-4 col-lg-3 mb-3">
          <div
            onClick={() => navigate('/admin/categories')}
            style={{
              background: "linear-gradient(to right, #667eea, #764ba2)",
              borderRadius: "16px",
              padding: "25px",
              color: "#fff",
              boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
              cursor: "pointer"
            }}
          >
            <span style={{ fontSize: "24px" }}>📂</span>
            <h5 className="mt-2">Browse Categories</h5>
            <p className="mb-0">Manage task categories</p>
          </div>
        </div> 

        <div className="col-md-4 col-lg-3 mb-3">
          <div
            onClick={() => navigate('/admin/subcategories')}
            style={{
              background: "linear-gradient(to right, #ff758c, #ff7eb3)",
              borderRadius: "16px",
              padding: "25px",
              color: "#fff",
              boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
              cursor: "pointer"
            }}
          >
            <span style={{ fontSize: "24px" }}>🗂️</span>
            <h5 className="mt-2">Browse Subcategories</h5>
            <p className="mb-0">Manage task subcategories</p>
          </div>
        </div>
      </div>

      {/* Main Admin Sections */}
      <div className="container mt-5">
        {/* User List Section */}
        <div className="card mb-4 shadow-sm border-0" style={{ borderRadius: "12px" }}>
          <div className="card-body">
            <UserList />
          </div>
        </div>

        {/* Task Monitor Section */}
        <div className="card mb-4 shadow-sm border-0" style={{ borderRadius: "12px" }}>
          <div className="card-body">
            <TaskMonitor />
          </div>
        </div>

        {/* Dispute Manager Section */}
        <div className="card mb-4 shadow-sm border-0" style={{ borderRadius: "12px" }}>
          <div className="card-body">
            <DisputeManager />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
