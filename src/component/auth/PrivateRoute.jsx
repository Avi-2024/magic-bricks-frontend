import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("authToken"); // Check if token exists

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;