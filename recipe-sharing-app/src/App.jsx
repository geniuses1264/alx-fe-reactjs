import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RecipeList from "./components/RecipeList";
import RecipeDetail from "./components/RecipeDetails"; // create this file if it doesn’t exist yet
import SearchBar from "./components/SearchBar"; // optional, if you made SearchBar
import AddRecipeForm from "./components/AddRecipeForm"; // optional, if you made AddRecipeForm
import RecommendationsList from "./components/RecommendationsList"; // optional, if you made RecommendationsList
import EditRecipeForm from "./components/EditRecipeForm"; // optional, if you made EditRecipeForm
import DeleteRecipeButton from "./components/DeleteRecipeButton"; // optional, if you made DeleteRecipeButton
import "./App.css";

function App() {
  return (
    <Router>
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
        <h1>🍲 Recipe Sharing App</h1>
        <SearchBar />
        <AddRecipeForm />
        <RecommendationsList />
        <EditRecipeForm />
        <DeleteRecipeButton />

        <Routes>
          <Route path="/" element={<RecipeList />} />
          <Route path="/recipes/:id" element={<RecipeDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
