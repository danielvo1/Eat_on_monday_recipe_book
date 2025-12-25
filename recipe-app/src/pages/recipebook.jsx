import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getRecipes } from '../utils/recipeStorage';

// The component name should be PascalCase
const RecipeBook = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const allRecipes = getRecipes();
    setRecipes(allRecipes);
  }, [location]);

  const handleRecipeClick = (recipeName) => {
    // Encode the recipe name for URL
    const encodedName = encodeURIComponent(recipeName);
    navigate(`/recipe/${encodedName}`);
  };

  const displayedRecipes = recipes.slice(0, 10);

  // Helper function to get first 3 ingredients as a string
  const getFirstThreeIngredients = (ingredients) => {
    const firstThree = ingredients.slice(0, 3);
    return firstThree.map(ing => ing.name).join(', ');
  };

  return (
    // The component should return a single root element
    <div className="about-page-container"> 
      <h2 style={{ marginBottom: '20px' }}>Recipe Book</h2>
      <table style={{ 
        width: '100%', 
        borderCollapse: 'collapse',
        border: '1px solid #ccc'
      }}>
        <thead>
          <tr style={{ backgroundColor: '#1a1a1a' }}>
            <th style={{ 
              padding: '12px', 
              border: '1px solid #ccc',
              textAlign: 'left'
            }}>
              Name of the Dish
            </th>
            <th style={{ 
              padding: '12px', 
              border: '1px solid #ccc',
              textAlign: 'left'
            }}>
              Number of Ingredients
            </th>
            <th style={{ 
              padding: '12px', 
              border: '1px solid #ccc',
              textAlign: 'left'
            }}>
              First 3 Ingredients
            </th>
          </tr>
        </thead>
        <tbody>
          {displayedRecipes.map((recipe, index) => (
            <tr 
              key={recipe.id || index}
              onClick={() => handleRecipeClick(recipe.name)}
              style={{
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(100, 108, 255, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '';
              }}
            >
              <td style={{ 
                padding: '12px', 
                border: '1px solid #ccc'
              }}>
                {recipe.name}
              </td>
              <td style={{ 
                padding: '12px', 
                border: '1px solid #ccc'
              }}>
                {recipe.ingredients.length}
              </td>
              <td style={{ 
                padding: '12px', 
                border: '1px solid #ccc'
              }}>
                {getFirstThreeIngredients(recipe.ingredients)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Export the component for use in the router configuration
export default RecipeBook;
