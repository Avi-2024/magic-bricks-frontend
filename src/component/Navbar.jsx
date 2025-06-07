import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("authToken"); 
  const [menuOpen, setMenuOpen] = useState(false); 

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <a href="/">MagicBricks</a>
      </div>
      <button className="menu-toggle" onClick={toggleMenu}>
        ☰
      </button>
      <ul className={`navbar-links ${menuOpen ? "open" : ""}`}>
        {isAuthenticated && <li><a href="/">Home</a></li>}
        {isAuthenticated && <li><a href="/upload">Upload Property</a></li>}
        {isAuthenticated && <li><a href="/profile">Profile</a></li>}
        {isAuthenticated ? (
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        ) : (
          <>
            <li><a href="/login" className="login-btn">Login</a></li>
           <li> <a href="/register" className="post-btn">Register</a></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;