import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TaskMonitor = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all tasks
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

  // Delete a task
  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:6000/api/tasks/${taskId}`, {
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

  // Reject a task
  const rejectTask = async (taskId) => {
    try {
      await axios.put(`http://localhost:6000/api/admin/tasks/${taskId}/reject`, {}, {
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

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Task Monitor</h2>
      {loading ? (
        <p>Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <p>No tasks available.</p>
      ) : (
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li key={task._id} className="p-4 border rounded shadow">
              <p><strong>Title:</strong> {task.title}</p>
              <p><strong>Description:</strong> {task.description}</p>
              <div className="flex flex-row gap-4 mt-3">
  <button
    className="bg-red-500 text-black px-4 py-1 rounded hover:bg-red-600 transition"
    onClick={() => deleteTask(task._id)}
  >
    Delete
  </button>
  <button
    className="bg-yellow-500 text-black px-4 py-1 rounded hover:bg-yellow-600 transition"
    onClick={() => rejectTask(task._id)}
  >
    Reject
  </button>
</div>

            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskMonitor;
