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
  const [purchaseRequests , setPurchaseRequests] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch user profile data
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const userResponse = await axios.get(`${import.meta.env.VITE_API_URL}/api/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserInfo(userResponse.data.user);
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
        const propertyResponse = await axios.get(`${import.meta.env.VITE_API_URL}/api/property/user-properties`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserProperties(propertyResponse.data.properties);
        setLoadingProperties(false);
      } catch (error) {
        setError("Failed to fetch user properties.");
        setLoadingProperties(false);
      }
    };

    fetchUserProperties();
  }, []);

  const handleUpdate = (propertyId) => {
   { console.log("propertyId",propertyId)}

    navigate(`/update-property/${propertyId}`);
  };

  const handleDelete = async (propertyId) => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/property/${propertyId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Property deleted successfully!");
      setUserProperties((prevProperties) =>
        prevProperties.filter((property) => property._id !== propertyId)
      );
    } catch (error) {
      if(error.msg){
        alert(error.msg);
      }
      else{
      console.error("Error deleting property:", error);
      alert("Failed to delete property.");
      }
    }
  };
  const handleDeletePurchaseRequests =async (propertyId) => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/${propertyId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
       setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      purchaseRequests: prevUserInfo.purchaseRequests.filter(
        (property) => property.propertyId !== propertyId
      ),
    }));
      alert("Property deleted successfully!");
    } catch (error) {
      if(error.msg){
        alert(error.msg);
      }
      else{
      console.error("Error deleting property:", error);
      alert("Failed to delete property.");
      }
    }
  };
  const handlepurchaseRequests = ()=>{
    if(purchaseRequests === false){
      setPurchaseRequests(true);
    }
    else{
      setPurchaseRequests(false);
    }
  }

  if (loadingProfile) return <p>Loading profile...</p>;
  // if (error) return <p>{error}</p>;

  return (
    <div className="profile-container">
      <h1>User Profile</h1>
      <div className="profile-info">
        <p><strong>Name:</strong> {userInfo.username}</p>
        <p><strong>Email:</strong> {userInfo.email}</p>
        <p><strong>Phone:</strong> {userInfo.phone}</p>
        <p><strong>Purchase Requests:</strong> {userInfo.purchaseRequests.length}  <button onClick={handlepurchaseRequests}>See Property</button></p>
      {purchaseRequests && (
        <>
        <h2>You Requested for this properties</h2>
        <div className="property-grid">
          
          {userInfo.purchaseRequests.length > 0 ? (
            userInfo.purchaseRequests.map((property) => (
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
                      className="delete-button"
                      onClick={() => {handleDeletePurchaseRequests(property.propertyId);              console.log("property",property)
}}
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
        </>
      )}
        
      </div>

      <h2>Your Uploaded Properties for sell</h2>
      {loadingProperties ? (
        <p>Loading properties...</p>
      ) : (
        <div className="property-grid">
          {userProperties.length > 0 ? (
            userProperties.map((property) => (
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