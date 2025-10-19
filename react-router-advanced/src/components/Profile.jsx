import React from "react"
import { Link, Outlet } from "react-router-dom"

export default function Profile() {
  return (
    <div style={{ padding: "20px" }}>
      <h2>User Profile</h2>
      <nav style={{ marginBottom: "15px" }}>
        <Link to="details" style={{ marginRight: "10px" }}>Profile Details</Link>
        <Link to="settings">Profile Settings</Link>
      </nav>
      <Outlet />
    </div>
  )
}
