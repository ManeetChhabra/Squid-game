// axios.config.js
import axios from "axios";

// Use the Vite environment variable or a fallback value.
// Make sure your .env file contains: VITE_API_URL=http://localhost:3015/api/v1
export const api = axios.create({
  baseURL:"https://skill-sensei-backend.onrender.com/api/v1" ,
  withCredentials: true, // To send cookies along with requests
});
