import { createContext, useState } from "react";
import axios from "axios";

// Create the context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState(""); // Store error messages

  // Login function
  const login = async (email, password) => {
    try {
      const response = await axios.post(
        "http://localhost:3015/api/v1/user/login",
        { email, password },
        { withCredentials: true } // Ensure token is sent with the request
      );

      if (response.data.success) {
        setIsLoggedIn(true);
        setUserId(response.data.userId); // Assuming userId is returned in the response
        setError(""); // Clear any previous errors
        return response.data.message; // Return success message
      } else {
        setError(response.data.message); // Set error from backend
        throw new Error(response.data.message); // Handle error
      }
    } catch (err) {
      console.error("Login failed:", err);
      setError(err.message || "An unexpected error occurred");
      throw err;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3015/api/v1/user/logout",
        {},
        { withCredentials: true } // Ensure credentials (cookies) are sent with the request
      );

      if (response.status === 200) {
        setIsLoggedIn(false); // Update the state to reflect the logout
        setUserId(null); // Clear userId
        setError(""); // Clear any previous error messages
        console.log("Logout successful");
      } else {
        setError(response.data?.message || "Logout failed.");
      }
    } catch (err) {
      console.error("Logout failed:", err);
      setError("Logout failed. Please try again.");
    }
  };

  // Check authentication status
  const checkAuthStatus = async () => {
    try {
      const response = await axios.get("/api/v1/user/auth/check", {
        withCredentials: true,
      });
      if (response.data.success) {
        setIsLoggedIn(true);
        setUserId(response.data.userId);
      }
    } catch (error) {
      setIsLoggedIn(false);
      setUserId(null);
      console.log("User not logged in:", error.response?.data?.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, login, logout, userId, error, checkAuthStatus }}
    >
      {children}
    </AuthContext.Provider>
  );
};
