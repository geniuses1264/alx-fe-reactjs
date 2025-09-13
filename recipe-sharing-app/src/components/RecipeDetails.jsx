import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useRecipeStore from '../Store/recipeStore';

const RecipeDetails = () => {
  const { id } = useParams();
  const recipeId = Number(id);
  const navigate = useNavigate();

  const recipe = useRecipeStore((state) =>
    state.recipes.find((r) => r.id === recipeId)
  );

  const updateRecipe = useRecipeStore((state) => state.updateRecipe);
  const deleteRecipe = useRecipeStore((state) => state.deleteRecipe);

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // Wait until recipe exists before populating fields
  useEffect(() => {
    if (recipe) {
      setTitle(recipe.title);
      setDescription(recipe.description);
    }
  }, [recipe]);

  // If recipe is not found, show a message
  if (!recipe) return <p>Recipe not found.</p>;

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      alert('Title and description cannot be empty');
      return;
    }
    updateRecipe({ id: recipeId, title, description });
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      deleteRecipe(recipeId);
      navigate('/');
    }
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ddd', marginTop: '20px' }}>
      {isEditing ? (
        <form onSubmit={handleUpdate}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Recipe Title"
            style={{ display: 'block', marginBottom: '10px', width: '300px' }}
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Recipe Description"
            style={{ display: 'block', marginBottom: '10px', width: '300px', height: '100px' }}
          />
          <button type="submit" style={{ marginRight: '10px' }}>Save</button>
          <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
        </form>
      ) : (
        <>
          <h1>{recipe.title}</h1>
          <p>{recipe.description}</p>
          <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
          </div>
        </>
      )}
    </div>
  );
};

export default RecipeDetails;
