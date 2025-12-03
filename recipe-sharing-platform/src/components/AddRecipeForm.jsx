// src/components/AddRecipeForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddRecipeForm() {
  const navigate = useNavigate();
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    ingredients: '',
    instructions: '',
    prepTime: '',
    cookTime: '',
    servings: '',
    difficulty: 'Easy'
  });

  // Validation errors state
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Recipe title is required';
    } else if (formData.title.length < 3) {
      newErrors.title = 'Title must be at least 3 characters';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }

    if (!formData.ingredients.trim()) {
      newErrors.ingredients = 'Ingredients are required';
    } else {
      const ingredientLines = formData.ingredients.split('\n').filter(line => line.trim());
      if (ingredientLines.length < 2) {
        newErrors.ingredients = 'Please enter at least 2 ingredients (one per line)';
      }
    }

    if (!formData.instructions.trim()) {
      newErrors.instructions = 'Instructions are required';
    } else if (formData.instructions.length < 20) {
      newErrors.instructions = 'Instructions must be at least 20 characters';
    }

    if (!formData.prepTime.trim()) {
      newErrors.prepTime = 'Preparation time is required';
    }

    if (!formData.cookTime.trim()) {
      newErrors.cookTime = 'Cooking time is required';
    }

    if (!formData.servings.trim()) {
      newErrors.servings = 'Servings is required';
    } else if (isNaN(formData.servings) || parseInt(formData.servings) < 1) {
      newErrors.servings = 'Please enter a valid number of servings';
    }

    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    
    try {
      // In a real app, you would send data to an API
      // For now, we'll simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Process ingredients into array
      const ingredientArray = formData.ingredients
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0);
      
      // Process instructions into array
      const instructionArray = formData.instructions
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0);
      
      // Create new recipe object
      const newRecipe = {
        id: Date.now(), // Temporary ID
        title: formData.title,
        summary: formData.description,
        description: formData.description,
        prepTime: formData.prepTime,
        cookTime: formData.cookTime,
        servings: parseInt(formData.servings),
        difficulty: formData.difficulty,
        ingredients: ingredientArray,
        instructions: instructionArray,
        image: `https://via.placeholder.com/800x500/10B981/FFFFFF?text=${encodeURIComponent(formData.title)}`,
        nutrition: {
          calories: '0',
          protein: '0g',
          carbs: '0g',
          fat: '0g'
        }
      };
      
      console.log('New recipe created:', newRecipe);
      
      // Show success message
      setSuccessMessage('Recipe added successfully! Redirecting...');
      
      // Reset form after 2 seconds and redirect
      setTimeout(() => {
        setFormData({
          title: '',
          description: '',
          ingredients: '',
          instructions: '',
          prepTime: '',
          cookTime: '',
          servings: '',
          difficulty: 'Easy'
        });
        setErrors({});
        navigate('/');
      }, 2000);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors({ submit: 'Failed to submit recipe. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/')}
            className="text-green-600 hover:text-green-800 font-semibold mb-4 flex items-center"
          >
            ← Back to Recipes
          </button>
          <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-2">
            🍳 Add New Recipe
          </h1>
          <p className="text-gray-600">
            Share your delicious recipe with the community
          </p>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
            {successMessage}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          {/* Submit Error */}
          {errors.submit && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {errors.submit}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Recipe Title */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 font-semibold mb-2">
                Recipe Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border ${errors.title ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                placeholder="e.g., Spaghetti Carbonara"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
              )}
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 font-semibold mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                className={`w-full px-4 py-3 rounded-lg border ${errors.description ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                placeholder="Brief description of your recipe..."
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">{errors.description}</p>
              )}
            </div>

            {/* Ingredients */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 font-semibold mb-2">
                Ingredients *
                <span className="text-gray-500 text-sm font-normal ml-2">
                  (Enter one ingredient per line)
                </span>
              </label>
              <textarea
                name="ingredients"
                value={formData.ingredients}
                onChange={handleChange}
                rows="5"
                className={`w-full px-4 py-3 rounded-lg border ${errors.ingredients ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent font-mono`}
                placeholder="400g spaghetti&#10;200g pancetta&#10;4 large eggs&#10;100g Pecorino Romano cheese"
              />
              {errors.ingredients && (
                <p className="text-red-500 text-sm mt-1">{errors.ingredients}</p>
              )}
            </div>

            {/* Instructions */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 font-semibold mb-2">
                Instructions *
                <span className="text-gray-500 text-sm font-normal ml-2">
                  (Enter one step per line)
                </span>
              </label>
              <textarea
                name="instructions"
                value={formData.instructions}
                onChange={handleChange}
                rows="5"
                className={`w-full px-4 py-3 rounded-lg border ${errors.instructions ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                placeholder="Bring a large pot of salted water to boil...&#10;While pasta cooks, heat a large skillet..."
              />
              {errors.instructions && (
                <p className="text-red-500 text-sm mt-1">{errors.instructions}</p>
              )}
            </div>

            {/* Prep Time */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Preparation Time *
              </label>
              <input
                type="text"
                name="prepTime"
                value={formData.prepTime}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border ${errors.prepTime ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                placeholder="e.g., 15 mins"
              />
              {errors.prepTime && (
                <p className="text-red-500 text-sm mt-1">{errors.prepTime}</p>
              )}
            </div>

            {/* Cook Time */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Cooking Time *
              </label>
              <input
                type="text"
                name="cookTime"
                value={formData.cookTime}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border ${errors.cookTime ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                placeholder="e.g., 20 mins"
              />
              {errors.cookTime && (
                <p className="text-red-500 text-sm mt-1">{errors.cookTime}</p>
              )}
            </div>

            {/* Servings */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Servings *
              </label>
              <input
                type="number"
                name="servings"
                value={formData.servings}
                onChange={handleChange}
                min="1"
                className={`w-full px-4 py-3 rounded-lg border ${errors.servings ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                placeholder="e.g., 4"
              />
              {errors.servings && (
                <p className="text-red-500 text-sm mt-1">{errors.servings}</p>
              )}
            </div>

            {/* Difficulty */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Difficulty
              </label>
              <select
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
          </div>

          {/* Form Actions */}
          <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col sm:flex-row justify-end space-y-4 sm:space-y-0 sm:space-x-4">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-300 transform hover:scale-105 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Adding Recipe...
                </span>
              ) : (
                'Add Recipe'
              )}
            </button>
          </div>

          {/* Form Help Text */}
          <div className="mt-6 text-sm text-gray-500">
            <p>* Required fields</p>
            <p className="mt-2">Your recipe will be shared with the community after review.</p>
          </div>
        </form>

        {/* Form Tips */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">💡 Tips for a great recipe:</h3>
          <ul className="text-gray-600 space-y-1">
            <li>• Be specific with measurements (grams, cups, tablespoons)</li>
            <li>• List ingredients in the order they're used</li>
            <li>• Break instructions into clear, numbered steps</li>
            <li>• Include cooking times and temperatures</li>
            <li>• Mention any special equipment needed</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AddRecipeForm;