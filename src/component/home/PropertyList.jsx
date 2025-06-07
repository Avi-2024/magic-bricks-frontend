import React, { useEffect, useState } from "react";
import axios from "axios";
import "./propertyList.css";

const PropertyList = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/property`);
        setProperties(response.data.property);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, []);

  const handleBuy = async (propertyId) => {
    try {
      const token = localStorage.getItem("authToken"); 
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/property/buy`,
        { propertyId },
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );
      alert("Property purchase request saved successfully!");
    } catch (error) {
      console.error("Error saving purchase request:", error);
      alert("Failed to save purchase request.");
    }
  };

  const handleCallOwner = (mobile) => {
    alert(`Call the owner at: ${mobile}`);
  };

  return (
    <div className="property-list-container">
      <h1 className="property-list-title">Available Properties</h1>
      <div className="property-grid">
        {properties.map((property) => (
          <div key={property._id} className="property-card">
            {property.image && (
              <img
                src={`${import.meta.env.VITE_API_URL}/${property.image}`}
                alt={property.title}
                className="property-image"
              />
            )}
            <div className="property-details">
              <h2 className="property-title">{property.title}</h2>
              <p className="property-address"><strong>Address:</strong> {property.address}</p>
              <p className="property-landmark"><strong>Landmark:</strong> {property.landmark}</p>
              <p className="property-pincode"><strong>Pincode:</strong> {property.pincode}</p>
              <p className="property-pincode"><strong>Price:</strong> {property.price}</p>

              <p className="property-mobile"><strong>Contact:</strong> {property.mobile}</p>
              <div className="property-actions">
                <button
                  className="buy-button"
                  onClick={() => handleBuy(property._id)}
                >
                  Buy
                </button>
                <button
                  className="call-button"
                  onClick={() => handleCallOwner(property.mobile)}
                >
                  Call the Owner
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyList;