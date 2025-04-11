import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL ;

export const register = async (userData) => {
  const response = await axios.post(`${API_URL}api/auth/register`, userData);
  return response.data;
};




export const login = async (email, password) => {
  const response = await axios.post(
    "https://task-assigner-backend-8184.onrender.com/api/auth/login",
    { email, password },
    {
      headers: { "Content-Type": "application/json" },
    }
  );

  return response.data.user; // ✅ Adjust based on your API response
};



export const getUserProfile = async () => {
  const token = localStorage.getItem('token'); // 🔑 Get token
  if (!token) throw new Error("Token not found");

  const response = await axios.get(`${API_URL}api/users/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

