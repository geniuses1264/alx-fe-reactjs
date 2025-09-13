import React, { useState } from 'react';
import useRecipeStore from './recipeStore';

const EditRecipeButton = ({ recipe }) => {
  const updateRecipe = useRecipeStore((state) => state.updateRecipe);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(recipe.title);
  const [description, setDescription] = useState(recipe.description);

  const handleSave = () => {
    updateRecipe(recipe.id, { title, description });
    setIsEditing(false);
  };

  return (
    <div>
      {isEditing ? (
        <div>
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <button onClick={() => setIsEditing(true)}>Edit Recipe</button>
      )}
    </div>
  );
};

export default EditRecipeButton;
