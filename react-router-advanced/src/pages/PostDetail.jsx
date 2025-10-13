import React from "react"
import { useParams } from "react-router-dom"

export default function PostDetail() {
  const { id } = useParams()

  return (
    <div style={{ padding: "20px" }}>
      <h2>Post Details</h2>
      <p>Viewing post ID: {id}</p>
      <p>This is a dynamic route example.</p>
    </div>
  )
}
