// Copilot: Rewrite the RecipeList component below so that it:
// 1. Uses the searchTerm from useRecipeStore to filter recipes (case-insensitive).
// 2. Shows "No recipes found." when nothing matches.
// 3. Keeps Add/Remove Favorites working.
// 4. Works together with SearchBar.jsx.


import { Link } from "react-router-dom";
import useRecipeStore from "./recipeStore"; // adjust path if needed

const RecipeList = () => {
  const recipes = useRecipeStore((state) => state.recipes);
  const favorites = useRecipeStore((state) => state.favorites);
  const addFavorite = useRecipeStore((state) => state.addFavorite);
  const removeFavorite = useRecipeStore((state) => state.removeFavorite);
  const searchTerm = useRecipeStore((state) => state.searchTerm);

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {filteredRecipes.length === 0 ? (
        <p>No recipes found.</p>
      ) : (
        filteredRecipes.map((recipe) => (
          <div
            key={recipe.id}
            style={{ border: "1px solid #ddd", margin: "10px", padding: "10px" }}
          >
            <h3>
              <Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link>
            </h3>
            <p>{recipe.description}</p>
            {favorites.includes(recipe.id) ? (
              <button onClick={() => removeFavorite(recipe.id)}>
                Remove from Favorites
              </button>
            ) : (
              <button onClick={() => addFavorite(recipe.id)}>
                Add to Favorites
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default RecipeList;

// This component displays a list of recipes from the store.
// It allows users to add or remove recipes from their favorites.
// It also filters recipes based on the search term from the store.
// Make sure to import and use this component in App.jsx.
// Ensure that the search functionality works seamlessly with the SearchBar component.
// Use proper styling to make the list visually appealing.
// Use conditional rendering to handle cases where there are no recipes or no favorites.


