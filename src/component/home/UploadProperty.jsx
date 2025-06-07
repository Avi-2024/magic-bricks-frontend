import React, { useState } from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode"; 
import "./UploadProperty.css";
import { useEffect } from "react";

const UploadProperty = () => {
  const [formData, setFormData] = useState({
    userId: "",
    title: "",
    address: "",
    landmark: "",
    pincode: "",
    mobile: "",
    price:"",
    image: null,
  });
  
   useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const decodedToken = jwtDecode(token);
      setFormData((prevFormData) => ({
        ...prevFormData,
        userId: decodedToken.userId, 
      }));
    }
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("userId", formData.userId);
    data.append("title", formData.title);
    data.append("address", formData.address);
    data.append("landmark", formData.landmark);
    data.append("pincode", formData.pincode);
    data.append("mobile", formData.mobile);
    data.append("image", formData.image);
    data.append("price",formData.price)

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/property/add-property`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Property uploaded:", response.data);
      alert("Property uploaded successfully!");
    } catch (error) {
      console.error("Error uploading property:", error);
      alert("Failed to upload property.");
    }
  };

  return (
    <div className="upload-property-container">
      <h1 className="upload-property-title">Upload Your Property</h1>
      <form onSubmit={handleSubmit} className="upload-property-form">
      
        <input
          type="text"
          name="title"
          placeholder="Property Title like 1BHK, 2BHK"
          onChange={handleChange}
          required
          className="form-input"
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          onChange={handleChange}
          required
          className="form-input"
        />
        <input
          type="text"
          name="landmark"
          placeholder="Landmark"
          onChange={handleChange}
          className="form-input"
        />
        <input
          type="text"
          name="pincode"
          placeholder="Pincode"
          onChange={handleChange}
          required
          className="form-input"
        />
        <input
          type="text"
          name="mobile"
          placeholder="Mobile Number"
          onChange={handleChange}
          required
          className="form-input"
        />
         <input
          type="text"
          name="price"
          placeholder="Price"
          onChange={handleChange}
          required
          className="form-input"
        />
        <input
          type="file"
          name="image"
          onChange={handleFileChange}
          required
          className="form-input"
        />
        <button type="submit" className="submit-button">Upload Property</button>
      </form>
    </div>
  );
};

export default UploadProperty;