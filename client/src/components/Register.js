import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [step, setStep] = useState(1); // Step 1 (check email/username) -> Step 2 (full details)
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    college: "",
    profileImage: null, // For profile picture upload
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value, // Update file input handling
    }));
  };

  // Step 1: Check if email and username are unique
  const handleCheckAvailability = async (e) => {
    e.preventDefault();
    setMessage("Checking availability...");
    setMessageType("info");

    try {
      const response = await axios.post("http://localhost:5000/auth/check-availability", {
        username: formData.username,
        email: formData.email,
      });

      setMessage(response.data.message);
      setMessageType("success");
      setStep(2); // Move to the next step
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong.");
      setMessageType("error");
    }
  };

  // Step 2: Register user
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Password matching check
    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match.");
      setMessageType("error");
      return;
    }

    // Prepare data for submission
    const userData = new FormData();
    Object.keys(formData).forEach((key) => {
      userData.append(key, formData[key]);  // Append profileImage if it exists
    });

    try {
      setMessage("Registering account...");
      setMessageType("info");

      const response = await axios.post("http://localhost:5000/auth/register", userData, {
        headers: { "Content-Type": "multipart/form-data" },  // Important for file upload
      });

      setMessage(response.data.message);
      setMessageType("success");
      setStep(3); // Move to the final step (optional: redirect to login)
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong.");
      setMessageType("error");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="p-4 shadow-lg" style={{ maxWidth: "400px", width: "100%" }}>
        <div className="text-center">
          <h1 className="fw-bold mb-3">eXAMhELP</h1>
          <p className="text-muted">{step === 1 ? "Check availability" : "Create your account"}</p>
        </div>

        {step === 1 ? (
          // Step 1: Check username & email availability
          <form onSubmit={handleCheckAvailability}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                placeholder="Enter a username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Next</button>
          </form>
        ) : (
          // Step 2: Enter additional details
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="college" className="form-label">College</label>
              <input
                type="text"
                className="form-control"
                id="college"
                name="college"
                placeholder="Enter your college name"
                value={formData.college}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="profileImage" className="form-label">Profile Image</label>
              <input
                type="file"
                className="form-control"
                id="profileImage"
                name="profileImage"
                accept="image/*"
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Register</button>
          </form>
        )}

        {/* Feedback message */}
        {message && (
          <p className={`mt-3 text-${messageType === "success" ? "success" : messageType === "error" ? "danger" : "info"}`}>
            {message}
          </p>
        )}

        {step === 1 && (
          <div className="text-center mt-3">
            <p className="mb-0">Already have an account?</p>
            <Link to="/login" className="btn btn-outline-secondary mt-2 w-100">Login</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
