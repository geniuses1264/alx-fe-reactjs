import React from "react"
import { useNavigate } from "react-router-dom"

export default function Login({ setIsAuthenticated }) {
  const navigate = useNavigate()

  const handleLogin = () => {
    setIsAuthenticated(true)
    navigate("/profile")
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Login Page</h2>
      <button onClick={handleLogin} style={{ padding: "10px", background: "#4CAF50", color: "white" }}>
        Log In
      </button>
    </div>
  )
}
