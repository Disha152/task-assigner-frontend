import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL ;

export const browseTasks = async (token) => {
  const response = await axios.get(`${API_URL}/browse`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const applyForTask = async (taskId, token) => {
  const response = await axios.post(`${API_URL}/${taskId}/apply`, {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const submitTask = async (taskId, submissionData, token) => {
  const response = await axios.post(`${API_URL}/submit/${taskId}`, submissionData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getAssignedTasks = async (token) => {
  const response = await axios.get(`${API_URL}/assigned`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
