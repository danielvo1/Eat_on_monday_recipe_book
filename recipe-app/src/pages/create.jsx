import React, { useState } from 'react';
import './create.css';

// The component name should be PascalCase
const Create = () => {
  const [recipeName, setRecipeName] = useState('');
  const [servingSize, setServingSize] = useState(1);
  const [ingredients, setIngredients] = useState([{ name: '', amount: '', unit: 'cups' }]);

  const measurementUnits = [
    'cups',
    'tablespoons',
    'teaspoons',
    'oz',
    'lbs',
    'grams',
    'kg',
    'ml',
    'liters',
    'pieces',
    'pinch',
    'dash'
  ];

  const handleAddIngredient = () => {
    setIngredients([...ingredients, { name: '', amount: '', unit: 'cups' }]);
  };

  const handleIngredientChange = (index, field, value) => {
    const newIngredients = [...ingredients];
    // Ensure amount is non-negative
    if (field === 'amount') {
      const numValue = parseFloat(value);
      if (value === '' || (!isNaN(numValue) && numValue >= 0)) {
        newIngredients[index][field] = value;
        setIngredients(newIngredients);
      }
    } else {
      newIngredients[index][field] = value;
      setIngredients(newIngredients);
    }
  };

  const handleServingSizeChange = (e) => {
    const value = parseFloat(e.target.value);
    if (e.target.value === '' || (!isNaN(value) && value >= 0)) {
      setServingSize(e.target.value === '' ? '' : value);
    }
  };

  const calculateTotal = (amount) => {
    const amountNum = parseFloat(amount);
    const servingSizeNum = parseFloat(servingSize);
    if (isNaN(amountNum) || isNaN(servingSizeNum) || amountNum < 0 || servingSizeNum < 0) {
      return '';
    }
    return (amountNum * servingSizeNum).toFixed(2);
  };

  const handleAddRecipe = (e) => {
    e.preventDefault();
    console.log('Add Recipe', { recipeName, servingSize, ingredients });
  };

  return (
    // The component should return a single root element
    <div className="about-page-container"> 
      <form onSubmit={handleAddRecipe}>
        <div className="recipe-name-container">
          <label>Recipe Name</label>
          <input 
            type="text" 
            value={recipeName}
            onChange={(e) => setRecipeName(e.target.value)}
            className="recipe-name-input"
          />
        </div>

        <div className="recipe-name-container">
          <label>Serving Size</label>
          <input 
            type="number"
            min="0"
            step="0.01"
            value={servingSize}
            onChange={handleServingSizeChange}
            className="recipe-name-input"
          />
        </div>

        <table className="ingredients-table">
          <thead>
            <tr>
              <th>
                Ingredient Name
              </th>
              <th>
                Ingredient Proportion
              </th>
              <th>
                Totals
              </th>
            </tr>
          </thead>
          <tbody>
            {ingredients.map((ingredient, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="text"
                    value={ingredient.name}
                    onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                    className="ingredient-input"
                  />
                </td>
                <td>
                  <div className="ingredient-amount-container">
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={ingredient.amount}
                      onChange={(e) => handleIngredientChange(index, 'amount', e.target.value)}
                      placeholder="Amount"
                      className="ingredient-amount-input"
                    />
                    <select
                      value={ingredient.unit}
                      onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)}
                      className="ingredient-unit-select"
                    >
                      {measurementUnits.map((unit) => (
                        <option key={unit} value={unit}>
                          {unit}
                        </option>
                      ))}
                    </select>
                  </div>
                </td>
                <td>
                  {calculateTotal(ingredient.amount) !== '' ? (
                    `${calculateTotal(ingredient.amount)} ${ingredient.unit}`
                  ) : (
                    '-'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button 
          type="button"
          onClick={handleAddIngredient}
          className="add-ingredient-button"
        >
          Add Ingredient
        </button>

        <button type="submit">Save Recipe</button>
      </form>
    </div>
  );
};

// Export the component for use in the router configuration
export default Create;
