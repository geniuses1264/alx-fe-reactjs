// src/components/RecommendationsList.jsx
import useRecipeStore from './recipeStore';
import { useEffect } from 'react';

const RecommendationsList = () => {
  const recommendations = useRecipeStore(state => state.recommendations);
  const generateRecommendations = useRecipeStore(state => state.generateRecommendations);

  // Re-generate recommendations on mount
  useEffect(() => {
    generateRecommendations();
  }, [generateRecommendations]);

  if (recommendations.length === 0) return <p>No recommendations yet!</p>;

  return (
    <div>
      <h2>Recommended Recipes</h2>
      {recommendations.map(recipe => (
        <div key={recipe.id} style={{ border: '1px solid #ddd', margin: '10px', padding: '10px' }}>
          <h3>{recipe.title}</h3>
          <p>{recipe.description}</p>
        </div>
      ))}
    </div>
  );
};

export default RecommendationsList;
// This component fetches and displays recommended recipes from the store.  It also triggers recommendation generation on mount.
// It handles the case when there are no recommendations by showing a message.
