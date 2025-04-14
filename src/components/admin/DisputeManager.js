// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const DisputeManager = () => {
//   const [disputes, setDisputes] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Fetch all disputes
//   const fetchDisputes = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get("https://task-assigner-backend-8184.onrender.com/api/disputes", {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });
//       setDisputes(response.data);
//     } catch (error) {
//       console.error("Error fetching disputes:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Resolve a specific dispute
//   const handleResolve = async (disputeId) => {
//     try {
//       await axios.get(`https://task-assigner-backend-8184.onrender.com/api/disputes/${disputeId}/resolve`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });
//       alert("Dispute resolved!");
//       fetchDisputes(); // Refresh the list
//     } catch (error) {
//       console.error("Error resolving dispute:", error);
//       alert("Failed to resolve the dispute.");
//     }
//   };

//   useEffect(() => {
//     fetchDisputes();
//   }, []);

//   return (
//     <div className="p-6">
//       <h2 className="text-xl font-semibold mb-4">Dispute Manager</h2>
//       {loading ? (
//         <p>Loading disputes...</p>
//       ) : disputes.length === 0 ? (
//         <p>No disputes found.</p>
//       ) : (
//         <ul className="space-y-4">
//           {disputes.map((dispute) => (
//             <li key={dispute._id} className="p-4 border rounded shadow">
//               <p><strong>Task:</strong> {dispute.taskTitle}</p>
//               <p><strong>User:</strong> {dispute.userEmail}</p>
//               <p><strong>Reason:</strong> {dispute.reason}</p>
//               <button
//                 className="mt-2 bg-green-500 text-black px-4 py-1 rounded hover:bg-green-600"
//                 onClick={() => handleResolve(dispute._id)}
//               >
//                 Resolve
//               </button>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default DisputeManager;
import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
      setDisputes(response.data);
    } catch (error) {
      console.error("Error fetching disputes:", error);
    } finally {
      setLoading(false);
    }
  };

  // Resolve a specific dispute
  const handleResolve = async (disputeId) => {
    try {
      await axios.get(`https://task-assigner-backend-8184.onrender.com/api/disputes/${disputeId}/resolve`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert("Dispute resolved!");
      fetchDisputes(); // Refresh the list
    } catch (error) {
      console.error("Error resolving dispute:", error);
      alert("Failed to resolve the dispute.");
    }
  };

  useEffect(() => {
    fetchDisputes();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Dispute Manager</h2>
      {loading ? (
        <p>Loading disputes...</p>
      ) : disputes.length === 0 ? (
        <p>No disputes found.</p>
      ) : (
        <ul className="space-y-4">
          {disputes.map((dispute) => (
            <li key={dispute._id} className="p-4 border rounded shadow">
              <p><strong>Task:</strong> {dispute.task?.title || "N/A"}</p>
              <p><strong>User:</strong> {dispute.raisedBy?.email || "N/A"}</p>
              <p><strong>Reason:</strong> {dispute.reason}</p>
              <p><strong>Status:</strong> {dispute.status}</p>
              <p><strong>Resolution:</strong> {dispute.resolution || "Pending"}</p>
              <button
                className="mt-2 bg-green-500 text-black px-4 py-1 rounded hover:bg-green-600"
                onClick={() => handleResolve(dispute._id)}
              >
                Resolve
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DisputeManager;
