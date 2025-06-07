import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar";
import UploadProperty from "./component/home/UploadProperty";
import PropertyList from "./component/home/PropertyList";
import Register from "./component/auth/register";
import Login from "./component/auth/login";
import PrivateRoute from "./component/auth/PrivateRoute";
import Profile from "../src/Profile"
import UpdateProperty from "./component/home/UpdateProperty";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <PropertyList />
            </PrivateRoute>
          }
        />
        <Route
          path="/upload"
          element={
            <PrivateRoute>
              <UploadProperty />
            </PrivateRoute>
          }
        />
        <Route
          path="/update-property/:id"
          element={
            <PrivateRoute>
              <UpdateProperty />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;