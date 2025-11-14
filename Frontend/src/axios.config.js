// axios.config.js
import axios from "axios";


export const api = axios.create({
  baseURL: "https://skill-sensei-yxti.onrender.com/api/v1",
  withCredentials: true, // To send cookies along with requests
});

// Add request interceptor for debugging in development
if (import.meta.env.DEV) {
  api.interceptors.request.use((config) => {
    console.log('API Request:', config.url);
    return config;
  });
}
