import React, { useEffect, useState } from 'react';
import { getAllTasks } from '../../services/taskService';

const BrowseTasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("https://task-assigner-backend-8184.onrender.com/api/tasks");
        console.log("Tasks fetched:", response.data); // 👈 Add this line
        setTasks(response.data.slice(0, 4));
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
        setLoading(false);
      }
    };
    
    fetchTasks();
  }, []);

  return (
    <div>
      {/* Render list of tasks */}
    </div>
  );
};

export default BrowseTasks;
