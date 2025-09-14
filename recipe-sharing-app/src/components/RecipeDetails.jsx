import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useRecipeStore from './recipeStore';


const RecipeDetails = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const recipe = useRecipeStore((state) =>
    state.recipes.find((r) => r.id === parseInt(id))

  );
  const updateRecipe = useRecipeStore((state) => state.updateRecipe);


  const deleteRecipe = useRecipeStore((state) => state.deleteRecipe);

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState(''); 
  const [error, setError] = useState('');

  useEffect(() => {

    if (recipe) {

      setTitle(recipe.title);
      setDescription(recipe.description);

    }
  }, [recipe]);

  const handleUpdate = () => {

    if (title.trim() === '' || description.trim() === '') {
      setError('Title and Description cannot be empty.');
      return;
    }
    updateRecipe({ id: recipe.id, title, description });
    setIsEditing(false);
    setError('');
  };  
  const handleDelete = () => {
    deleteRecipe(recipe.id);
    navigate('/');

  }
  if (!recipe) {
    return <div>Recipe not found.</div>;
  }
  return (
   
     <div>
      {isEditing ? (
        <div>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {error && <div style={{ color: 'red' }}>{error}</div>}
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <h2>{recipe.title}</h2>
          <p>{recipe.description}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
}
export default RecipeDetails;    


