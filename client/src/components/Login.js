import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // Import Axios for API requests
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // Feedback message
  const [messageType, setMessageType] = useState(""); // Message type (success/error/info)
  const navigate =useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate fields
    if (!email || !password) {
      setMessage("Please fill in all fields.");
      setMessageType("error"); // Red error message
      return;
    }

    try {
      // Set processing message while the request is in progress
      setMessage("Processing... Please wait.");
      setMessageType("info"); // Blue info message

      // Send the login request to the backend
      const response = await axios.post("http://localhost:5000/auth/login", {
        email,
        password,
      });

      // If login is successful, show success message and store token
      setMessage(response.data.message);
      setMessageType("success");

      // Optionally, store the token in localStorage (for authenticated sessions)
      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("userName", response.data.username);
      navigate("/")
    } catch (error) {
      // Handle errors (invalid credentials, server errors, etc.)
      if (error.response && error.response.data) {
        setMessage(error.response.data.message); // Show error message from backend
        setMessageType("error"); // Red error message
      } else {
        setMessage("Something went wrong. Please try again later.");
        setMessageType("error"); // Red error message
      }
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="p-4 shadow-lg" style={{ maxWidth: "400px", width: "100%" }}>
        <div className="text-center">
          <h1 className="fw-bold mb-3">eXAMhELP</h1>
          <p className="text-muted">Sign in to continue</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>

        {/* Display the feedback message */}
        {message && (
          <p
            className={`mt-3 text-${
              messageType === "success"
                ? "success"
                : messageType === "error"
                ? "danger"
                : "info"
            }`}
          >
            {message}
          </p>
        )}

        <div className="text-center mt-3">
          <Link to="/forgot-password" className="text-decoration-none">
            Forgot Password?
          </Link>
        </div>
        <hr />
        <div className="text-center">
          <p className="mb-0">Don't have an account?</p>
          <Link to="/register" className="btn btn-outline-secondary mt-2 w-100">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
