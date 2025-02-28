import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
const checkAuthStatus = () => {
  return user !== null; // Returns true if user is logged in
};
  // Login function calls your backend login endpoint.
  const login = async (email, password) => {
    try {
      const response = await fetch("/api/v1/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // so that HTTP-only cookies are handled
        body: JSON.stringify({ email, password }),
      });

      // Read the response as text first
      const text = await response.text();
      let data = {};
      if (text) {
        try {
          data = JSON.parse(text);
        } catch (parseError) {
          console.error("Error parsing JSON:", parseError);
          setError("Invalid JSON response from server");
          throw new Error("Invalid JSON response from server");
        }
      } else {
        // If the response is empty, throw an error
        setError("Empty response from server");
        throw new Error("Empty response from server");
      }

      console.log("Login response:", data, "Status:", response.status);

      if (!response.ok) {
        const errorMessage = data.message || "Login failed";
        setError(errorMessage);
        throw new Error(errorMessage);
      }

      // Expecting { message: "Login successful", role: "student" } or similar
      const userData = { email, role: data.role };
      setUser(userData);
      setError("");
      return userData;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const logout = () => {
    setUser(null);
    // Optionally call your backend logout endpoint
  };

  return (
    <AuthContext.Provider value={{ user, login, error, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
