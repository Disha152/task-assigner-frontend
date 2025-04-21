


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaCheckCircle } from 'react-icons/fa';

const DisputeManager = () => {
  const [disputes, setDisputes] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all disputes
  const fetchDisputes = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://task-assigner-backend-8184.onrender.com/api/disputes", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      // Filter out resolved disputes
      setDisputes(response.data.filter((dispute) => dispute.status !== "resolved"));
    } catch (error) {
      console.error("Error fetching disputes:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle dispute resolution
  const handleResolve = async (disputeId) => {
    const resolution = prompt("Enter resolution message:");
    if (!resolution || resolution.trim() === "") {
      alert("Resolution is required.");
      return;
    }
    try {
      await axios.put(
        `https://task-assigner-backend-8184.onrender.com/api/disputes/${disputeId}/resolve`,
        {
          status: "resolved", // Ensure lowercase to match schema enum
          resolution,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert("Dispute resolved!");
      fetchDisputes(); // Refresh disputes list
    } catch (error) {
      console.error("Error resolving dispute:", error.response?.data || error.message);
      alert("Failed to resolve the dispute.");
    }
  };

  useEffect(() => {
    fetchDisputes();
  }, []);

  const renderStatusColor = (status) => {
    if (status === 'resolved') return 'status-resolved';
    if (status === 'open') return 'status-pending';
    if (status === 'rejected') return 'status-rejected';
    return 'status-default';
  };

  return (
    <div className="dispute-container">
      <h2 className="dispute-header">Dispute Manager</h2>

      {loading ? (
        <div className="loading-message">Loading disputes...</div>
      ) : disputes.length === 0 ? (
        <div className="no-disputes">No disputes found.</div>
      ) : (
        <ul className="dispute-list">
          {disputes.map((dispute) => (
            <li key={dispute._id} className="dispute-card">
              <div className="task-title">{dispute.task?.title || "N/A"}</div>
              <p><strong>User:</strong> {dispute.raisedBy?.email || "N/A"}</p>
              <p><strong>Reason:</strong> {dispute.reason}</p>
              <div className="status-container">
                <span className={`status-badge ${renderStatusColor(dispute.status)}`}>
                  {dispute.status}
                </span>
                <span><strong>Resolution:</strong> {dispute.resolution || "Pending"}</span>
              </div>

              <div className="button-container">
                {dispute.status !== 'resolved' && (
                  <button
                    className="resolve-btn"
                    onClick={() => handleResolve(dispute._id)}
                  >
                    <FaCheckCircle className="icon" />
                    Resolve
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DisputeManager;
