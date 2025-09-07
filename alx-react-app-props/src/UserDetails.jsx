import { useContext } from "react";
import UserContext from "./components/UserContext";



function UserDetails() {

const  userData = useContext(UserContext)

  return (
    <div style={{padding: "10px", border: "2px solid #ccc"}}>
      <h2>User details</h2>
      <p><strong>Name:</strong> {userData.name}</p>
      <p><strong>Email:</strong> {userData.email}</p>
      <p><strong>Role:</strong> {userData.role}</p>
    </div>
  );
}

export default UserDetails;
