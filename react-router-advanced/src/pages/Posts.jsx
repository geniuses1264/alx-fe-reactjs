import React from "react"
import { Link } from "react-router-dom"

const posts = [
  { id: 1, title: "React Basics" },
  { id: 2, title: "Routing in React" },
  { id: 3, title: "State Management" },
]

export default function Posts() {
  return (
    <div style={{ padding: "20px" }}>
      <h2>All Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
