import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getRecipeByName, updateRecipe } from '../utils/recipeStorage';
import './recipedetail.css';

const RecipeDetail = () => {
  const { recipeName } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedRecipe, setEditedRecipe] = useState(null);

  useEffect(() => {
    // Decode the recipe name from URL
    const decodedName = decodeURIComponent(recipeName);
    const foundRecipe = getRecipeByName(decodedName);
    if (foundRecipe) {
      setRecipe(foundRecipe);
      setEditedRecipe({
        ...foundRecipe,
        ingredients: foundRecipe.ingredients.map(ing => ({ ...ing }))
      });
    }
  }, [recipeName]);

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleCancel = () => {
    // Reset to original recipe
    setEditedRecipe({
      ...recipe,
      ingredients: recipe.ingredients.map(ing => ({ ...ing }))
    });
    setIsEditMode(false);
  };

  const handleSave = () => {
    updateRecipe(recipe.id, editedRecipe);
    setRecipe(editedRecipe);
    setIsEditMode(false);
  };

  const handleIngredientChange = (index, field, value) => {
    const newIngredients = [...editedRecipe.ingredients];
    newIngredients[index][field] = value;
    setEditedRecipe({ ...editedRecipe, ingredients: newIngredients });
  };

  const handleRemoveIngredient = (index) => {
    const newIngredients = editedRecipe.ingredients.filter((_, i) => i !== index);
    setEditedRecipe({ ...editedRecipe, ingredients: newIngredients });
  };

  const handleAddIngredient = () => {
    const newIngredients = [...editedRecipe.ingredients, { name: '', proportion: '' }];
    setEditedRecipe({ ...editedRecipe, ingredients: newIngredients });
  };

  const handleNameChange = (e) => {
    setEditedRecipe({ ...editedRecipe, name: e.target.value });
  };

  if (!recipe) {
    return (
      <div className="recipe-detail-container">
        <p>Recipe not found</p>
      </div>
    );
  }

  const currentRecipe = isEditMode ? editedRecipe : recipe;

  return (
    <div className="recipe-detail-container">
      <button 
        onClick={() => navigate('/recipebook')}
        className="back-button"
      >
        ← Back to Recipe Book
      </button>

      <div className="recipe-header">
        {isEditMode ? (
          <input
            type="text"
            value={currentRecipe.name}
            onChange={handleNameChange}
            className="recipe-name-edit"
          />
        ) : (
          <h1 className="recipe-title">{currentRecipe.name}</h1>
        )}
      </div>

      <div className="ingredients-section">
        <h2>Ingredients</h2>
        <table className="ingredients-detail-table">
          <thead>
            <tr>
              <th>Ingredient Name</th>
              <th>Ingredient Proportion</th>
              {isEditMode && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {currentRecipe.ingredients.map((ingredient, index) => (
              <tr key={index}>
                <td>
                  {isEditMode ? (
                    <input
                      type="text"
                      value={ingredient.name}
                      onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                      className="ingredient-input"
                    />
                  ) : (
                    <span>{ingredient.name}</span>
                  )}
                </td>
                <td>
                  {isEditMode ? (
                    <input
                      type="text"
                      value={ingredient.proportion}
                      onChange={(e) => handleIngredientChange(index, 'proportion', e.target.value)}
                      className="ingredient-input"
                    />
                  ) : (
                    <span>{ingredient.proportion}</span>
                  )}
                </td>
                {isEditMode && (
                  <td>
                    <button
                      onClick={() => handleRemoveIngredient(index)}
                      className="remove-ingredient-button"
                    >
                      Remove
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>

        {isEditMode && (
          <button
            onClick={handleAddIngredient}
            className="add-ingredient-button"
          >
            Add Ingredient
          </button>
        )}
      </div>

      <div className="recipe-actions">
        {!isEditMode ? (
          <button
            onClick={handleEditClick}
            className="edit-button"
          >
            <span className="edit-icon">✏️</span> Edit Recipe
          </button>
        ) : (
          <div className="edit-actions">
            <button
              onClick={handleCancel}
              className="cancel-button"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="save-button"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeDetail;

