import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./updateProperty.css";

const UpdateProperty = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [property, setProperty] = useState({
    title: "",
    address: "",
    landmark: "",
    pincode: "",
    price: "",
    mobile: "",
    image: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/property/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProperty(response.data.property);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch property details." ,err);
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProperty((prev) => ({ ...prev, [name]: value }));
  };
  const handleFileChange = (e) => {
  const file = e.target.files[0];
  setProperty((prev) => ({ ...prev, image: file })); // Add the file to the state
};
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken");
      const formData = new FormData();
    formData.append("title", property.title);
    formData.append("address", property.address);
    formData.append("landmark", property.landmark);
    formData.append("pincode", property.pincode);
    formData.append("price", property.price);
    formData.append("mobile", property.mobile);
    if (property.image) {
      formData.append("image", property.image); 
    }

    await axios.put(
      `${import.meta.env.VITE_API_URL}/api/property/${id}`,
      formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",

          },
        }
      );
      alert("Property updated successfully!");
      navigate("/profile"); // Redirect to profile page
    } catch (err) {
      console.error("Error updating property:", err);
      alert("Failed to update property.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="update-property-container">
      <h1>Update Property</h1>
      <form onSubmit={handleSubmit} className="update-property-form">
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={property.title}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Address:
          <input
            type="text"
            name="address"
            value={property.address}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Landmark:
          <input
            type="text"
            name="landmark"
            value={property.landmark}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Pincode:
          <input
            type="text"
            name="pincode"
            value={property.pincode}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Price:
          <input
            type="number"
            name="price"
            value={property.price}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Mobile:
          <input
            type="text"
            name="mobile"
            value={property.mobile}
            onChange={handleChange}
            required
          />
        </label>
         <label>
    Image:
    <input
      type="file"
      name="image"
      accept="image/*"
      onChange={handleFileChange}
    />
  </label>
        <button type="submit" className="update-button">Update</button>
      </form>
    </div>
  );
};

export default UpdateProperty;