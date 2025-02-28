import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../axios.config.js"; // Adjust path if needed

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      // With the updated baseURL, this calls: http://localhost:3015/api/v1/user/login
      const response = await api.post("/user/login", { email, password });
      if (response.status === 200) {
        const { role } = response.data;
        setLoginSuccess(true);

        setTimeout(() => {
          setLoginSuccess(false);
          if (role === "student") {
            navigate("/dashboard");
          } else if (role === "instructor") {
            navigate("/publish");
          } else {
            navigate("/");
          }
        }, 3000);
      }
    } catch (err) {
      console.error("Login error:", err);
      setErrorMessage(
        err.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        {errorMessage && (
          <div className="bg-red-100 text-red-600 p-2 rounded mb-4 text-center">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-blue-500 text-white p-2 rounded transition ${
              isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
            }`}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        {loginSuccess && (
          <div className="mt-4 bg-green-100 text-green-600 p-2 rounded text-center">
            Login successful!
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
