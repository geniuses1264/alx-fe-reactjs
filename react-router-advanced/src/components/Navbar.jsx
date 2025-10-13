import React from "react"
import { Link, useNavigate } from "react-router-dom"

export default function Navbar({ isAuthenticated, setIsAuthenticated }) {
  const navigate = useNavigate()

  const handleLogout = () => {
    setIsAuthenticated(false)
    navigate("/")
  }

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-around",
        background: "#333",
        padding: "1rem",
        color: "white",
      }}
    >
      <Link to="/" style={{ color: "white" }}>Home</Link>
      <Link to="/posts" style={{ color: "white" }}>Posts</Link>
      {isAuthenticated ? (
        <>
          <Link to="/profile" style={{ color: "white" }}>Profile</Link>
          <button onClick={handleLogout} style={{ background: "red", color: "white" }}>Logout</button>
        </>
      ) : (
        <Link to="/login" style={{ color: "white" }}>Login</Link>
      )}
    </nav>
  )
}
