import React, { useState } from "react";
import "./auth.css";
import axios from "axios"
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/login`, formData);
    console.log("Login successful:", response.data);
    localStorage.setItem("authToken", response.data.token);

    alert("Login successful!");
    navigate("/")
  } catch (error) {
    if ( error.response.data.msg) {
      alert(error.response.data.msg); 
    } else {
      console.error("Login error:", error);
      alert("Failed to Login. Please try again.");
    }
  }
};

  return (
    <div className="auth-container">
      <h2>Login to Your Account</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
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
        <button type="submit" className="auth-btn">Login</button>
      </form>
      <p>
        Don't have an account? <a href="/register">Register</a>
      </p>
    </div>
  );
};

export default Login;