// src/components/EditRecipeForm.jsx
import { useState, useEffect } from 'react';
import useRecipeStore from './recipeStore';

const EditRecipeForm = ({ recipeId, onClose }) => {
  const recipe = useRecipeStore(state =>
    state.recipes.find(r => r.id === recipeId)
  );

  const updateRecipe = useRecipeStore(state => state.updateRecipe);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (recipe) {
      setTitle(recipe.title);
      setDescription(recipe.description);
    }
  }, [recipe]);

  if (!recipe) return <p>Recipe not found.</p>;

  const handleSubmit = (event) => {
    event.preventDefault(); // ✅ required
    if (!title.trim() || !description.trim()) {
      alert('Title and description cannot be empty');
      return;
    }
    updateRecipe({ id: recipeId, title, description });
    onClose(); // optional: close form after update
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Recipe Title"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Recipe Description"
        required
      />
      <button type="submit">Save</button>
      <button type="button" onClick={onClose}>Cancel</button>
    </form>
  );
};

export default EditRecipeForm;
