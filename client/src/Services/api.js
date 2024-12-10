import axios from "axios";

// Create an axios instance
const api = axios.create({
  baseURL: "http://localhost:5000", // Adjust the base URL as needed
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
