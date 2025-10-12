import React from "react"
import { useQuery } from "react-query"

// Function to fetch posts
const fetchPosts = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts")
  if (!response.ok) throw new Error("Network response was not ok")
  return response.json()
}

export default function PostsComponent() {
  const {
    data: posts,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useQuery("posts", fetchPosts, {
    staleTime: 5000, // data stays fresh for 5 seconds
    cacheTime: 10000, // cached data kept for 10 seconds
  })

  if (isLoading) return <p>Loading posts...</p>
  if (isError) return <p>Error: {error.message}</p>

  return (
    <div>
      <button onClick={() => refetch()} disabled={isFetching}>
        {isFetching ? "Refreshing..." : "Refetch Posts"}
      </button>

      <ul style={{ marginTop: "20px" }}>
        {posts.slice(0, 10).map((post) => (
          <li key={post.id}>
            <strong>{post.title}</strong>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
