import React, { useState } from "react";
import "./auth.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Register component for user registration
const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });
  const navigate = useNavigate();

  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // handleSubmit function to send registration data to the server
  const handleSubmit = async (e) => {
  e.preventDefault();
  if (formData.username.length < 3) {
      alert("Username must be at least 3 characters long.");
      return;
    }
   if (formData.password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.phone)) {
      alert("Phone number must be exactly 10 digits.");
      return;
    }
  try {
    console.log(`${import.meta.env.VITE_API_URL}/api/register`)
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/register`, formData);
    console.log("Working")
    console.log("Registration successful:", response);
    alert("Registration successful!");
    navigate("/login")
  } catch (error) {
    if ( error.response.data.msg) {
      alert(error.response.data.msg); 
    } else {
      console.error("Registration error:", error);
      alert("Failed to register. Please try again.");
    }
  }
};

  return (
    <div className="auth-container">
      <h2>Create an Account</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Full Name"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit" className="auth-btn">Register</button>
      </form>
      <p>
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
  );
};

export default Register;
