import React, { useContext } from "react";
import UserContext from "./UserContext";

function UserProfile() {
  // Get user data from context
  const userData = useContext(UserContext);

  return (
    <div style={{ padding: "10px", border: "2px solid #ccc", marginTop: "10px" }}>
      <h2>User Profile</h2>
      <p><strong>Name:</strong> {userData.name}</p>
      <p><strong>Email:</strong> {userData.email}</p>
      <p><strong>Role:</strong> {userData.role}</p>
    </div>
  );
}

export default UserProfile;
