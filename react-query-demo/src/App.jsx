
import { QueryClient, QueryClientProvider } from "react-query"
import PostsComponent from "./components/PostsComponent"

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div style={{ padding: "20px", fontFamily: "Arial" }}>
        <h1>React Query Demo: Posts</h1>
        <PostsComponent />
      </div>
    </QueryClientProvider>
  )
}
