// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { FaTrash, FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';

// const TaskMonitor = () => {
//   const [tasks, setTasks] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Fetch all tasks
//   const fetchTasks = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get("https://task-assigner-backend-8184.onrender.com/api/tasks", {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });
//       setTasks(response.data);
//     } catch (error) {
//       console.error("Error fetching tasks:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Delete a task
//   const deleteTask = async (taskId) => {
//     try {
//       await axios.delete(`https://task-assigner-backend-8184.onrender.com/api/tasks/${taskId}`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });
//       alert("Task deleted successfully!");
//       fetchTasks();
//     } catch (error) {
//       console.error("Error deleting task:", error);
//       alert("Failed to delete task.");
//     }
//   };

//   // Reject a task
//   const rejectTask = async (taskId) => {
//     try {
//       await axios.put(`https://task-assigner-backend-8184.onrender.com/api/admin/tasks/${taskId}/reject`, {}, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });
//       alert("Task rejected!");
//       fetchTasks();
//     } catch (error) {
//       console.error("Error rejecting task:", error);
//       alert("Failed to reject task.");
//     }
//   };

//   // Approve a task (using updated public route with admin token)
// const approveTask = async (taskId) => {
//   try {
//     await axios.put(`https://task-assigner-backend-8184.onrender.com/api/tasks/${taskId}/approve`, {}, {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       },
//     });
//     alert("Task approved!");
//     fetchTasks();
//   } catch (error) {
//     console.error("Error approving task:", error);
//     alert("Failed to approve task.");
//   }
// };


//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   return (
//     <div className="task-container">
//       <h2 className="task-header">Task Monitor</h2>
      
//       {loading ? (
//         <div className="loading-message">Loading tasks...</div>
//       ) : tasks.length === 0 ? (
//         <div className="no-tasks">No tasks available.</div>
//       ) : (
//         <div className="task-grid">
//           {tasks.map((task) => (
//             <div key={task._id} className="task-card">
//               <h3 className="task-title">{task.title}</h3>
//               <p><strong>Description:</strong> {task.description}</p>
//               <p><strong>Status:</strong> {task.status}</p> {/* Displaying the task's current status */}
//               <div className="button-container">
//   <button
//     className="delete-btn"
//     onClick={() => deleteTask(task._id)}
//   >
//     {/* <FaTrash className="icon" /> */}
//      Delete
//   </button>
//   <button
//   className="reject-btn"
//   onClick={() => rejectTask(task._id)}
//   disabled={task.status === 'rejected'}
//   style={{
//     backgroundColor: task.status === 'rejected' ? '#ccc' : '',
//     cursor: task.status === 'rejected' ? 'not-allowed' : 'pointer'
//   }}
// >
//   {task.status === 'rejected' ? 'Rejected' : 'Reject'}
// </button>

// <button
//   className="approve-btn"
//   onClick={() => approveTask(task._id)}
//   disabled={task.status !== 'pending'}
// >
//   Approve
// </button>

// </div>

              
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default TaskMonitor;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // <-- Import useNavigate

const TaskMonitor = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // <-- Initialize useNavigate

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://task-assigner-backend-8184.onrender.com/api/tasks", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`https://task-assigner-backend-8184.onrender.com/api/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert("Task deleted successfully!");
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Failed to delete task.");
    }
  };

  const rejectTask = async (taskId) => {
    try {
      await axios.put(`https://task-assigner-backend-8184.onrender.com/api/admin/tasks/${taskId}/reject`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert("Task rejected!");
      fetchTasks();
    } catch (error) {
      console.error("Error rejecting task:", error);
      alert("Failed to reject task.");
    }
  };

  const approveTask = async (taskId) => {
    try {
      await axios.put(`https://task-assigner-backend-8184.onrender.com/api/tasks/${taskId}/approve`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert("Task approved!");
      fetchTasks();
    } catch (error) {
      console.error("Error approving task:", error);
      alert("Failed to approve task.");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="task-container">
      <h2 className="task-header">Task Monitor</h2>
      
      {loading ? (
        <div className="loading-message">Loading tasks...</div>
      ) : tasks.length === 0 ? (
        <div className="no-tasks">No tasks available.</div>
      ) : (
        <div className="task-grid">
          {tasks.map((task) => (
            <div 
              key={task._id} 
              className="task-card" 
              onClick={() => navigate(`/task/${task._id}`)} // <-- Navigate on card click
              style={{ cursor: 'pointer' }} // Add pointer cursor
            >
              <h3 className="task-title">{task.title}</h3>
              <p><strong>Description:</strong> {task.description}</p>
              <p><strong>Status:</strong> {task.status}</p>

              <div className="button-container" onClick={e => e.stopPropagation()}>
                <button className="delete-btn" onClick={() => deleteTask(task._id)}>Delete</button>
                <button
                  className="reject-btn"
                  onClick={() => rejectTask(task._id)}
                  disabled={task.status === 'rejected'}
                  style={{
                    backgroundColor: task.status === 'rejected' ? '#ccc' : '',
                    cursor: task.status === 'rejected' ? 'not-allowed' : 'pointer'
                  }}
                >
                  {task.status === 'rejected' ? 'Rejected' : 'Reject'}
                </button>
                <button
                  className="approve-btn"
                  onClick={() => approveTask(task._id)}
                  disabled={task.status !== 'pending'}
                >
                  Approve
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskMonitor;
