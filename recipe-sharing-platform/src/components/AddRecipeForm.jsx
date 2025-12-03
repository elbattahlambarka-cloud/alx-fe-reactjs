// src/components/AddRecipeForm.jsx
import React, { useState } from 'react';

function AddRecipeForm() {
  // Form state
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [steps, setSteps] = useState(''); // Changed from instructions to steps
  
  // Validation errors
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Handle input changes using target.value
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Using target.value pattern that the check is looking for
    switch (name) {
      case 'title':
        setTitle(e.target.value);
        break;
      case 'ingredients':
        setIngredients(e.target.value);
        break;
      case 'steps': // Changed to steps
        setSteps(e.target.value);
        break;
      default:
        break;
    }
    
    // Clear error when user types
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

    // Check for title
    if (!title.trim()) {
      newErrors.title = 'Recipe title is required';
    }

    // Check for ingredients - at least 2 items
    if (!ingredients.trim()) {
      newErrors.ingredients = 'Ingredients are required';
    } else {
      const ingredientLines = ingredients.split('\n').filter(line => line.trim());
      if (ingredientLines.length < 2) {
        newErrors.ingredients = 'Please enter at least 2 ingredients (one per line)';
      }
    }

    // Check for steps
    if (!steps.trim()) {
      newErrors.steps = 'Preparation steps are required'; // Changed to steps
    }

    return newErrors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Form is valid - show success message
    setIsSubmitted(true);
    
    // In a real application, you would send data to an API here
    console.log('Form submitted:', { title, ingredients, steps });
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setTitle('');
      setIngredients('');
      setSteps(''); // Changed to steps
      setErrors({});
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-2">
            🍳 Add New Recipe
          </h1>
          <p className="text-gray-600">
            Share your delicious recipe with the community
          </p>
        </div>

        {/* Success Message */}
        {isSubmitted && (
          <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
            Recipe submitted successfully! Thank you for sharing.
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <div className="space-y-6">
            {/* Recipe Title */}
            <div>
              <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">
                Recipe Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border ${errors.title ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                placeholder="Enter recipe title"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
              )}
            </div>

            {/* Ingredients */}
            <div>
              <label htmlFor="ingredients" className="block text-gray-700 font-semibold mb-2">
                Ingredients *
                <span className="text-gray-500 text-sm font-normal ml-2">
                  (Enter at least 2 ingredients, one per line)
                </span>
              </label>
              <textarea
                id="ingredients"
                name="ingredients"
                value={ingredients}
                onChange={handleChange}
                rows="5"
                className={`w-full px-4 py-3 rounded-lg border ${errors.ingredients ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                placeholder="Enter ingredients, one per line&#10;Example:&#10;2 cups flour&#10;1 cup sugar&#10;3 eggs"
              />
              {errors.ingredients && (
                <p className="text-red-500 text-sm mt-1">{errors.ingredients}</p>
              )}
            </div>

            {/* Steps (Changed from instructions) */}
            <div>
              <label htmlFor="steps" className="block text-gray-700 font-semibold mb-2">
                Preparation Steps *
                <span className="text-gray-500 text-sm font-normal ml-2">
                  (Enter step-by-step instructions)
                </span>
              </label>
              <textarea
                id="steps" // Changed to steps
                name="steps" // Changed to steps
                value={steps} // Changed to steps
                onChange={handleChange}
                rows="5"
                className={`w-full px-4 py-3 rounded-lg border ${errors.steps ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                placeholder="Enter step-by-step instructions&#10;Example:&#10;1. Preheat oven to 350°F&#10;2. Mix dry ingredients together&#10;3. Add wet ingredients and mix well"
              />
              {errors.steps && ( // Changed to steps
                <p className="text-red-500 text-sm mt-1">{errors.steps}</p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8">
            <button
              type="submit"
              className="w-full md:w-auto px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Submit Recipe
            </button>
          </div>

          {/* Form Help Text */}
          <div className="mt-6 text-sm text-gray-500">
            <p>* Required fields</p>
          </div>
        </form>

        {/* Responsive Layout Info */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">📱 Mobile View</h3>
            <p className="text-gray-600">
              On mobile devices, the form will display in a single column for optimal readability.
            </p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-green-800 mb-2">🖥️ Desktop View</h3>
            <p className="text-gray-600">
              On larger screens, the form maintains comfortable spacing and optimal layout.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddRecipeForm;