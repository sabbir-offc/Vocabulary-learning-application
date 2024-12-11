import axios from "axios";

// Create Axios instance
const api = axios.create({
  baseURL: "http://localhost:5000/api", // Adjust to your backend URL
});

// Add an interceptor to include the token in the headers
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
