/*
FavoritesList.jsx

Create a component that:
- Uses useRecipeStore to get favorites array
- Maps favorite IDs to recipes using the recipes array
- Displays each favorite recipe with title and description
- Includes a 'Remove from Favorites' button that calls removeFavorite
- Handles case when there are no favorites by showing a message

Export this component as default.
*/

import useRecipeStore from './recipeStore';

const FavoritesList = () => {
  const favorites = useRecipeStore(state => state.favorites);
  const recipes = useRecipeStore(state => state.recipes);
  const removeFavorite = useRecipeStore(state => state.removeFavorite);

  const favoriteRecipes = recipes.filter(recipe => favorites.includes(recipe.id));

  if (favoriteRecipes.length === 0) {
    return <p>No favorite recipes yet.</p>;
  }
  return (
    <div>
      {favoriteRecipes.map(recipe => (
        <div key={recipe.id}>
          <h3>{recipe.title}</h3>
          <p>{recipe.description}</p>
          <button onClick={() => removeFavorite(recipe.id)}>Remove from Favorites</button>
        </div>
      ))}
    </div>
  );
};

export default FavoritesList;
