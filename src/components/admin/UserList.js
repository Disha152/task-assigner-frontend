import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FiTrash2 } from 'react-icons/fi'; // npm install react-icons

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://task-assigner-backend-8184.onrender.com/api/users/all", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (userId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`https://task-assigner-backend-8184.onrender.com/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      // Remove deleted user from state
      setUsers(users.filter(user => user._id !== userId));
      alert("User deleted successfully!");
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="user-list-container">
      <h2 className="header">User List</h2>
      {loading ? (
        <p>Loading users...</p>
      ) : users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <div className="user-cards">
          {users.map((user) => (
            <div key={user._id} className="user-card">
              <div className="user-info">
                <p className="user-name"><strong>Name:</strong> {user.name}</p>
                <p className="user-email"><strong>Email:</strong> {user.email}</p>
                <p className="user-role"><strong>Role:</strong> {user.role}</p>
              </div>
              
              <button
    className="delete-btn"
    onClick={() => deleteUser(user._id)}
    
  >
     <FiTrash2 size={20} />
   
     Remove User
  </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserList;
