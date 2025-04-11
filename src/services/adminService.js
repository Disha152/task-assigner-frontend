import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL ;

export const getAllUsers = async (token) => {
  const response = await axios.get(`${API_URL}/api/users/all`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getAllTaskSubmissions = async (token) => {
  const response = await axios.get(`${API_URL}/api/submissions`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const resolveDispute = async (disputeId, resolutionData, token) => {
  const response = await axios.post(`${API_URL}/api/disputes/${disputeId}/resolve`, resolutionData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};



