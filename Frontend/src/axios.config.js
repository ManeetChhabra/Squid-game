// axios.config.js
import axios from "axios";

// Use environment variables for different environments
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1";

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // To send cookies along with requests
});

// Add request interceptor for debugging in development
if (import.meta.env.DEV) {
  api.interceptors.request.use((config) => {
    console.log('API Request:', config.url);
    return config;
  });
}
