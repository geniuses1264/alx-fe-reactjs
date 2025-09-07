import { useContext } from "react";
import UserContext from "./components/UserContext";

function UserInfo() {
  const userData = useContext(UserContext);

  return (
    <div style={{padding: "10px", border: "1px solid #ddd"}}>
      <h2>User Info</h2>
      <p>Welcome, {userData.name}!</p>
    </div>
  );
}
export default UserInfo
