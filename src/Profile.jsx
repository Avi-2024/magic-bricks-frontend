import React, { useEffect, useState } from "react";
import axios from "axios";
import "./component/home/propertyList.css";
import "./profile.css";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [userProperties, setUserProperties] = useState([]);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingProperties, setLoadingProperties] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch user profile data
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const userResponse = await axios.get("http://localhost:5000/api/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserInfo(userResponse.data.user);
        console.log(userResponse.data.user)
        setLoadingProfile(false);
      } catch (err) {
        setError("Failed to fetch user profile.");
        setLoadingProfile(false);
      }
    };

    fetchUserProfile();
  }, []);

  // Fetch user properties data
  useEffect(() => {
    const fetchUserProperties = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const propertyResponse = await axios.get("http://localhost:5000/api/property/user-properties", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserProperties(propertyResponse.data.properties);
        setLoadingProperties(false);
      } catch (err) {
        setError("Failed to fetch user properties.");
        setLoadingProperties(false);
      }
    };

    fetchUserProperties();
  }, []);

  const handleUpdate = (propertyId) => {
    navigate(`/update-property/${propertyId}`);
  };

  const handleDelete = async (propertyId) => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.delete(`http://localhost:5000/api/property/${propertyId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Property deleted successfully!");
      setUserProperties((prevProperties) =>
        prevProperties.filter((property) => property._id !== propertyId)
      );
    } catch (error) {
      console.error("Error deleting property:", error);
      alert("Failed to delete property.");
    }
  };

  if (loadingProfile) return <p>Loading profile...</p>;
  // if (error) return <p>{error}</p>;

  return (
    <div className="profile-container">
      <h1>User Profile</h1>
      <div className="profile-info">
        <p><strong>Name:</strong> {userInfo.username}</p>
        <p><strong>Email:</strong> {userInfo.email}</p>
        <p><strong>Phone:</strong> {userInfo.phone}</p>
      </div>

      <h2>Your Properties</h2>
      {loadingProperties ? (
        <p>Loading properties...</p>
      ) : (
        <div className="property-grid">
          {userProperties.length > 0 ? (
            userProperties.map((property) => (
              <div key={property._id} className="property-card">
                {property.image && (
                  <img
                    src={`http://localhost:5000/${property.image}`}
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
                      className="update-button"
                      onClick={() => handleUpdate(property._id)}
                    >
                      Update
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(property._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No properties found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;