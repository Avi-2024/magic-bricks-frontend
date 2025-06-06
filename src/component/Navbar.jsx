import React from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("authToken"); // Check if token exists

  const handleLogout = () => {
    localStorage.removeItem("authToken"); 
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <a href="/">MagicBricks</a>
      </div>
      <ul className="navbar-links">
        {isAuthenticated && <li><a href="/">Home</a></li>}

        {isAuthenticated && <li><a href="/upload">Upload Property</a></li>}
        {isAuthenticated && <li><a href="/profile">Profile</a></li>}

      </ul>
      <div className="navbar-actions">
        {isAuthenticated ? (
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        ) : (
          <>
            <a href="/login" className="login-btn">Login</a>
            <a href="/register" className="post-btn">Register</a>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;