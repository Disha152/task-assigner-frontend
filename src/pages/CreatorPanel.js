// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const CreatorPanel = () => {
//   const [tasks, setTasks] = useState([]);
//   const [selectedTask, setSelectedTask] = useState(null);
//   const [applications, setApplications] = useState([]);
//   const [submissions, setSubmissions] = useState([]);
//   const token = localStorage.getItem('token'); // Ensure the user is authenticated

//   useEffect(() => {
//     fetchCreatedTasks();
//   }, []);

//   const fetchCreatedTasks = async () => {
//     try {
//       const response = await axios.get('https://task-assigner-backend-8184.onrender.com/api/tasks/my-created', {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setTasks(response.data);
//     } catch (error) {
//       console.error('Error fetching tasks:', error);
//     }
//   };

//   const fetchApplications = async (taskId) => {
//     try {
//       const response = await axios.get(`https://task-assigner-backend-8184.onrender.com/api/tasks/${taskId}/applications`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setApplications(response.data);
//       setSelectedTask(taskId);
//     } catch (error) {
//       console.error('Error fetching applications:', error);
//     }
//   };

//   const approveApplicant = async (taskId, userId) => {
//     try {
//       await axios.put(`https://task-assigner-backend-8184.onrender.com/api/tasks/${taskId}/approve/${userId}`, {}, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       alert('Applicant approved successfully.');
//       fetchApplications(taskId); // Refresh applications list
//     } catch (error) {
//       console.error('Error approving applicant:', error);
//     }
//   };

//   const fetchSubmissions = async (taskId) => {
//     try {
//       const response = await axios.get(`http://localhost:6000/api/submissions?taskId=${taskId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setSubmissions(response.data);
//       setSelectedTask(taskId);
//     } catch (error) {
//       console.error('Error fetching submissions:', error);
//     }
//   };

//   const approveSubmission = async (submissionId) => {
//     try {
//       await axios.put(`http://localhost:6000/api/submissions/${submissionId}/approve`, {}, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       alert('Submission approved successfully.');
//       fetchSubmissions(selectedTask); // Refresh submissions list
//     } catch (error) {
//       console.error('Error approving submission:', error);
//     }
//   };

//   return (
//     <div>
//       <h2>Creator Panel</h2>
//       <div>
//         <h3>Your Created Tasks</h3>
//         <ul>
//           {tasks.map((task) => (
//             <li key={task._id}>
//               {task.title}
//               <button onClick={() => fetchApplications(task._id)}>Review Applications</button>
//               <button onClick={() => fetchSubmissions(task._id)}>Review Submissions</button>
//             </li>
//           ))}
//         </ul>
//       </div>
//       {applications.length > 0 && (
//         <div>
//           <h3>Applications for Selected Task</h3>
//           <ul>
//             {applications.map((app) => (
//               <li key={app._id}>
//                 {app.applicantName}
//                 <button onClick={() => approveApplicant(selectedTask, app.applicantId)}>Approve Applicant</button>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//       {submissions.length > 0 && (
//         <div>
//           <h3>Submissions for Selected Task</h3>
//           <ul>
//             {submissions.map((submission) => (
//               <li key={submission._id}>
//                 {submission.submitterName}
//                 <button onClick={() => approveSubmission(submission._id)}>Approve Submission</button>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CreatorPanel;
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CreatorPanel = () => {
  const [tasks, setTasks] = useState([]);
  const [applications, setApplications] = useState({});
  const [submissions, setSubmissions] = useState({});

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          'https://task-assigner-backend-8184.onrender.com/api/tasks/my-created',
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setTasks(response.data);
      } catch (error) {
        console.error('Failed to fetch created tasks:', error.response?.data || error.message);
      }
    };

    fetchTasks();
  }, [token]);

  const fetchApplications = async (taskId) => {
    try {
      const response = await axios.get(
        `https://task-assigner-backend-8184.onrender.com/api/tasks/${taskId}/applications`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setApplications((prev) => ({ ...prev, [taskId]: response.data }));
    } catch (error) {
      console.error(`Failed to fetch applications for ${taskId}:`, error.response?.data || error.message);
    }
  };

  const assignTask = async (taskId, userId) => {
    try {
      await axios.post(
        'https://task-assigner-backend-8184.onrender.com/api/tasks/assign-task',
        { taskId, userId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert('User approved and assigned to task!');
    } catch (error) {
      console.error('Assignment failed:', error.response?.data || error.message);
    }
  };

  const approveSubmission = async (submissionId) => {
    try {
      await axios.put(
        `https://task-assigner-backend-8184.onrender.com/api/submissions/${submissionId}/approve`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert('Submission approved!');
    } catch (error) {
      console.error('Submission approval failed:', error.response?.data || error.message);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Creator Panel</h1>
      <h2 className="text-xl font-semibold mb-4">Your Created Tasks</h2>

      {tasks.length === 0 ? (
        <p>No tasks created or unauthorized.</p>
      ) : (
        tasks.map((task) => (
          <div key={task._id} className="border rounded-xl p-4 mb-6 shadow-md">
            <h3 className="text-lg font-semibold">{task.title}</h3>
            <p className="text-gray-600">{task.description}</p>

            <button
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => fetchApplications(task._id)}
            >
              Review Applications
            </button>

            {applications[task._id] && (
              <div className="mt-3">
                <h4 className="font-semibold">Applications:</h4>
                {applications[task._id].length === 0 ? (
                  <p>No applications.</p>
                ) : (
                  applications[task._id].map((app) => (
                    <div key={app._id} className="p-2 border rounded mb-2 flex justify-between items-center">
                      <span>{app.user.name || app.user.email}</span>
                      <button
                        onClick={() => assignTask(task._id, app.user._id)}
                        className="bg-green-500 text-white px-3 py-1 rounded"
                      >
                        Approve & Assign
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        ))
      )}

      <h2 className="text-xl font-semibold mt-8 mb-4">Review Submitted Tasks</h2>

     
      <button
        className="bg-purple-500 text-white px-4 py-2 rounded"
        onClick={() => approveSubmission('67f2202662885bf281a850bf')}
      >
        Approve Sample Submission
      </button>
    </div>
  );
};

export default CreatorPanel;
