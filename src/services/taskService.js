import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL ;

export const createTask = async (taskData, token) => {
  const response = await axios.post(`${API_URL}/api/tasks`, taskData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getAllTasks = async () => {
  const response = await axios.get(`${API_URL}/api/tasks`);
  return response.data;
};

export const getTaskById = async (taskId) => {
  const response = await axios.get(`${API_URL}/${taskId}`);
  return response.data;
};

export const applyToTask = async (taskId, token, coverLetter = '') => {
  const response = await axios.post(
    `${API_URL}/${taskId}/apply`,
    { coverLetter }, // Send cover letter in request body
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
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

export const reviewSubmission = async (taskId, reviewData, token) => {
  const response = await axios.post(`${API_URL}/review/${taskId}`, reviewData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};


const assignUser = async (userId) => {
  try {
    const res = await axios.post(`/api/tasks/${taskId}/assign/${userId}`);
    alert(res.data.message);
    fetchApplicants(); // refresh the list
  } catch (err) {
    console.error(err);
    alert('Failed to assign user');
  }
};

