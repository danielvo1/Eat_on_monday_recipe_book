// Recipe storage utility using localStorage
const STORAGE_KEY = 'recipes';

// Get all recipes from localStorage
export const getRecipes = () => {
  const recipesJson = localStorage.getItem(STORAGE_KEY);
  if (!recipesJson) {
    // Initialize with dummy recipes if none exist
    const dummyRecipes = [
      {
        id: '1',
        name: 'Spaghetti Carbonara',
        ingredients: [
          { name: 'Spaghetti', proportion: '400g' },
          { name: 'Pancetta', proportion: '200g' },
          { name: 'Eggs', proportion: '4' },
          { name: 'Parmesan cheese', proportion: '100g' },
          { name: 'Black pepper', proportion: 'to taste' }
        ]
      },
      {
        id: '2',
        name: 'Chicken Curry',
        ingredients: [
          { name: 'Chicken breast', proportion: '500g' },
          { name: 'Curry powder', proportion: '2 tbsp' },
          { name: 'Coconut milk', proportion: '400ml' },
          { name: 'Onions', proportion: '2' },
          { name: 'Garlic', proportion: '3 cloves' },
          { name: 'Ginger', proportion: '1 tbsp' }
        ]
      },
      {
        id: '3',
        name: 'Chocolate Chip Cookies',
        ingredients: [
          { name: 'Flour', proportion: '250g' },
          { name: 'Butter', proportion: '150g' },
          { name: 'Sugar', proportion: '100g' },
          { name: 'Chocolate chips', proportion: '200g' },
          { name: 'Vanilla extract', proportion: '1 tsp' },
          { name: 'Baking soda', proportion: '1 tsp' }
        ]
      },
      {
        id: '4',
        name: 'Caesar Salad',
        ingredients: [
          { name: 'Romaine lettuce', proportion: '1 head' },
          { name: 'Caesar dressing', proportion: '3 tbsp' },
          { name: 'Parmesan cheese', proportion: '50g' },
          { name: 'Croutons', proportion: '100g' },
          { name: 'Lemon juice', proportion: '1 tbsp' }
        ]
      },
      {
        id: '5',
        name: 'Beef Stroganoff',
        ingredients: [
          { name: 'Beef sirloin', proportion: '500g' },
          { name: 'Mushrooms', proportion: '300g' },
          { name: 'Sour cream', proportion: '200ml' },
          { name: 'Onions', proportion: '1' },
          { name: 'Beef broth', proportion: '250ml' },
          { name: 'Flour', proportion: '2 tbsp' }
        ]
      },
      {
        id: '6',
        name: 'Vegetable Stir Fry',
        ingredients: [
          { name: 'Mixed vegetables', proportion: '400g' },
          { name: 'Soy sauce', proportion: '3 tbsp' },
          { name: 'Garlic', proportion: '2 cloves' },
          { name: 'Ginger', proportion: '1 tsp' },
          { name: 'Sesame oil', proportion: '1 tbsp' }
        ]
      },
      {
        id: '7',
        name: 'Tomato Soup',
        ingredients: [
          { name: 'Tomatoes', proportion: '800g' },
          { name: 'Onions', proportion: '2' },
          { name: 'Garlic', proportion: '3 cloves' },
          { name: 'Vegetable broth', proportion: '500ml' },
          { name: 'Basil', proportion: '2 tbsp' },
          { name: 'Heavy cream', proportion: '100ml' }
        ]
      },
      {
        id: '8',
        name: 'Fish Tacos',
        ingredients: [
          { name: 'White fish fillets', proportion: '500g' },
          { name: 'Tortillas', proportion: '8' },
          { name: 'Cabbage', proportion: '200g' },
          { name: 'Lime', proportion: '2' },
          { name: 'Cilantro', proportion: '1/4 cup' },
          { name: 'Avocado', proportion: '2' }
        ]
      },
      {
        id: '9',
        name: 'Margherita Pizza',
        ingredients: [
          { name: 'Pizza dough', proportion: '300g' },
          { name: 'Tomato sauce', proportion: '150ml' },
          { name: 'Mozzarella cheese', proportion: '200g' },
          { name: 'Fresh basil', proportion: '10 leaves' },
          { name: 'Olive oil', proportion: '2 tbsp' }
        ]
      },
      {
        id: '10',
        name: 'Banana Bread',
        ingredients: [
          { name: 'Ripe bananas', proportion: '3' },
          { name: 'Flour', proportion: '250g' },
          { name: 'Sugar', proportion: '150g' },
          { name: 'Eggs', proportion: '2' },
          { name: 'Butter', proportion: '100g' },
          { name: 'Baking powder', proportion: '1 tsp' },
          { name: 'Vanilla extract', proportion: '1 tsp' }
        ]
      }
    ];
    saveRecipes(dummyRecipes);
    return dummyRecipes;
  }
  return JSON.parse(recipesJson);
};

// Save recipes to localStorage
export const saveRecipes = (recipes) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
};

// Get a single recipe by ID
export const getRecipeById = (id) => {
  const recipes = getRecipes();
  return recipes.find(recipe => recipe.id === id);
};

// Get a single recipe by name (for URL-friendly routing)
export const getRecipeByName = (name) => {
  const recipes = getRecipes();
  return recipes.find(recipe => recipe.name === name);
};

// Update a recipe
export const updateRecipe = (id, updatedRecipe) => {
  const recipes = getRecipes();
  const index = recipes.findIndex(recipe => recipe.id === id);
  if (index !== -1) {
    recipes[index] = { ...updatedRecipe, id };
    saveRecipes(recipes);
    return true;
  }
  return false;
};

// Add a new recipe
export const addRecipe = (recipe) => {
  const recipes = getRecipes();
  const newId = Date.now().toString(); // Simple ID generation
  const newRecipe = { ...recipe, id: newId };
  recipes.push(newRecipe);
  saveRecipes(recipes);
  return newRecipe;
};

