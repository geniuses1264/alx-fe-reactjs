// RecipeDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import recipesData from "../data.json"; // adjust path if needed

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      setLoading(true);
      setError(null);

      // Normalize structure: supports either array or { recipes: [...] }
      const data = Array.isArray(recipesData)
        ? recipesData
        : recipesData.recipes ?? [];

      // Find recipe by id (id from params is a string → compare properly)
      const found = data.find((r) => String(r.id) === String(id));

      if (!found) {
        throw new Error("Recipe not found");
      }

      setRecipe(found);
    } catch (err) {
      console.error("Error loading recipe:", err);
      setError("Failed to load recipe.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  if (loading) return <p className="text-center text-gray-600">Loading recipe...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full h-64 object-cover rounded-lg mb-6"
      />
      <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
      <ul className="list-disc list-inside mb-4">
        {recipe.ingredients.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <h2 className="text-xl font-semibold mb-2">Preparation Steps</h2>
      <p className="text-gray-700 whitespace-pre-line">{recipe.steps}</p>
        {/* Ingredients */}
      <div className="bg-gray-50 p-6 rounded-lg shadow mb-6">
        <h2 className="text-2xl font-semibold mb-3">Ingredients</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          {recipe.ingredients?.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>

      {/* Instructions */}
      <div className="bg-gray-50 p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-3">Instructions</h2>
        <ol className="list-decimal pl-6 space-y-3 text-gray-700">
          {recipe.instructions?.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default RecipeDetail;
