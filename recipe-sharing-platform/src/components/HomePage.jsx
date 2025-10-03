// HomePage.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";  // 👈 use Link for routing
import recipesData from "../data.json";   // adjust path if needed

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      setLoading(true);
      setError(null);

      // Support both top-level array or { recipes: [...] }
      const data = Array.isArray(recipesData)
        ? recipesData
        : recipesData.recipes ?? [];

      setRecipes(data);
    } catch (err) {
      console.error("Error loading recipes:", err);
      setError("Failed to load recipes.");
    } finally {
      setLoading(false);
    }
  }, []);

  const placeholder =
    "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400' viewBox='0 0 600 400'%3E%3Crect fill='%23e5e7eb' width='600' height='400'/%3E%3Ctext fill='%23737479' font-family='Arial,Helvetica,sans-serif' font-size='20' x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle'%3EImage unavailable%3C/text%3E%3C/svg%3E";

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Recipe Sharing Platform</h1>

      {loading ? (
        <p className="text-center text-gray-600">Loading recipes...</p>
      ) : error ? (
        <p className="text-center text-red-600">{error}</p>
      ) : recipes.length === 0 ? (
        <p className="text-center text-gray-600">No recipes available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition duration-300"
            >
              <img
                src={recipe.image || placeholder}
                alt={recipe.title || "Recipe image"}
                className="w-full h-48 object-cover rounded-t-lg"
                onError={(e) => {
                  if (e.currentTarget.src !== placeholder) {
                    e.currentTarget.src = placeholder;
                  }
                }}
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{recipe.title}</h2>
                <p className="text-gray-600 mb-4">{recipe.summary}</p>

                {/* 👇 use Link instead of <a> */}
                <Link
                  to={`/recipe/${recipe.id}`}
                  className="inline-block text-blue-600 font-medium hover:underline"
                >
                  View Recipe →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
