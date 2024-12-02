import axios from 'axios';

// Use the base URL for the Flask API
const api = axios.create({
  baseURL: "http://localhost:5000",  // Ensure this matches your Flask app's URL
});

export default api;
