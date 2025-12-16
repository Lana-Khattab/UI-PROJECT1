import Navbar from '../components/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { recipeAPI } from '../utils/api'
import { useAuth } from '../context/AuthContext'

function AddRecipe() {
  const navigate = useNavigate()
  const { user } = useAuth()

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    cuisine: '',
    difficulty: 'easy',
    cookTime: 30,
    servings: 4,
    calories: '',
    protein: '',
    carbs: '',
    fat: ''
  })
  
  const [selectedMealTypes, setSelectedMealTypes] = useState([])
  const [selectedDiets, setSelectedDiets] = useState([])
  const [ingredients, setIngredients] = useState([])
  const [currentIngredient, setCurrentIngredient] = useState('')
  const [instructions, setInstructions] = useState([''])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snack']
  const diets = ['Vegetarian', 'Vegan', 'Gluten-Free', 'Keto', 'Pescatarian', 'Dairy-Free']

  const toggleMealType = (type) => {
    setSelectedMealTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    )
  }
                                                                                                                        
  const toggleDiet = (diet) => {
    setSelectedDiets(prev => 
      prev.includes(diet) ? prev.filter(d => d !== diet) : [...prev, diet]
    )
  }

  const addIngredient = () => {
    if (currentIngredient.trim()) {
      setIngredients([...ingredients, currentIngredient])
      setCurrentIngredient('')
    }
  }

  const removeIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index))
  }

  const addInstruction = () => {
    setInstructions([...instructions, ''])
  }

  const updateInstruction = (index, value) => {
    const updated = [...instructions]
    updated[index] = value
    setInstructions(updated)
  }

  const removeInstruction = (index) => {
    setInstructions(instructions.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
    console.log('Form submitted')
    console.log('FormData:', formData)
    console.log('Ingredients:', ingredients)
    console.log('Instructions:', instructions)
    console.log('Selected meal types:', selectedMealTypes)

    if (!formData.title || !formData.description || !formData.cuisine) {
      setError('Please fill in all required fields')
      console.log('Missing required fields')
      return
    }

    if (ingredients.length === 0) {
      setError('Please add at least one ingredient')
      return
    }

    const validInstructions = instructions.filter(i => i.trim())
    if (validInstructions.length === 0) {
      setError('Please add at least one instruction')
      return
    }

    if (selectedMealTypes.length === 0) {
      setError('Please select at least one meal type')
      return
    }

    try {
      setIsSubmitting(true)
      console.log('Starting API call...')

      const recipeData = {
        title: formData.title,
        image: formData.imageUrl || 'https://via.placeholder.com/400x300?text=No+Image',
        time: parseInt(formData.cookTime),
        servings: parseInt(formData.servings),
        ingredients,
        instructions: validInstructions,
        nutrition: {
          calories: parseInt(formData.calories) || 0,
          protein: formData.protein ? `${formData.protein}g` : '0g',
          carbs: formData.carbs ? `${formData.carbs}g` : '0g',
          fat: formData.fat ? `${formData.fat}g` : '0g'
        },
        tags: [...selectedMealTypes, ...selectedDiets],
        difficulty: formData.difficulty,
        cuisine: formData.cuisine
      }

      console.log('Recipe data to send:', recipeData)

      const response = await recipeAPI.create(recipeData)
      console.log('Response received:', response)

      if (response.data.success) {
        console.log('Recipe created successfully, navigating...')
        navigate(`/recipe/${response.data.recipe._id}`)
      }
    } catch (err) {
      console.error('Error creating recipe:', err)
      console.error('Error response:', err.response)
      setError(err.response?.data?.message || 'Failed to create recipe. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-gray-50 dark:bg-dark-bg text-gray-800 dark:text-white font-sans min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-6 py-10 max-w-4xl">
        <Link to="/" className="flex items-center text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 mb-6 transition-colors">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </Link>

        <h2 className="text-3xl font-bold mb-2 dark:text-white">Create New Recipe</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">Share your culinary creation with the Foodies community</p>

        {error && (
          <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 text-red-700 dark:text-red-200 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <section className="bg-white dark:bg-dark-card rounded-xl border border-gray-200 dark:border-dark-border p-8">
            <h3 className="text-xl font-semibold mb-6 dark:text-white">Basic Information</h3>
            <div className="grid gap-6">
              <div>
                <label className="block font-medium mb-2 dark:text-white">Recipe Title *</label>
                <input 
                  type="text" 
                  placeholder="e.g., Creamy Garlic Pasta"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full border border-gray-300 dark:border-dark-border dark:bg-dark-border dark:text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors" 
                />
              </div>

              <div>
                <label className="block font-medium mb-2 dark:text-white">Description *</label>
                <textarea 
                  placeholder="Describe your recipe..." 
                  rows="4"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full border border-gray-300 dark:border-dark-border dark:bg-dark-border dark:text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors"
                ></textarea>
              </div>

              <div>
                <label className="block font-medium mb-2 dark:text-white">Image URL</label>
                <input 
                  type="text" 
                  placeholder="https://example.com/image.jpg"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                  className="w-full border border-gray-300 dark:border-dark-border dark:bg-dark-border dark:text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors" 
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-medium mb-2 dark:text-white">Cuisine *</label>
                  <select 
                    value={formData.cuisine}
                    onChange={(e) => setFormData({...formData, cuisine: e.target.value})}
                    className="w-full border border-gray-300 dark:border-dark-border dark:bg-dark-border dark:text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors"
                  >
                    <option value="">Select cuisine</option>
                    <option value="italian">Italian</option>
                    <option value="egyptian">Egyptian</option>
                    <option value="american">American</option>
                    <option value="french">French</option>
                    <option value="chinese">Chinese</option>
                    <option value="japanese">Japanese</option>
                    <option value="mexican">Mexican</option>
                    <option value="indian">Indian</option>
                    <option value="thai">Thai</option>
                    <option value="greek">Greek</option>
                    <option value="middle-eastern">Middle Eastern</option>
                    <option value="spanish">Spanish</option>
                    <option value="lebanese">Lebanese</option>
                    <option value="turkish">Turkish</option>
                    <option value="moroccan">Moroccan</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium mb-2 dark:text-white">Difficulty</label>
                  <select 
                    value={formData.difficulty}
                    onChange={(e) => setFormData({...formData, difficulty: e.target.value})}
                    className="w-full border border-gray-300 dark:border-dark-border dark:bg-dark-border dark:text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors"
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-medium mb-2 dark:text-white">Cook Time (minutes)</label>
                  <input 
                    type="number" 
                    value={formData.cookTime}
                    onChange={(e) => setFormData({...formData, cookTime: e.target.value})}
                    className="w-full border border-gray-300 dark:border-dark-border dark:bg-dark-border dark:text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors" 
                  />
                </div>
                <div>
                  <label className="block font-medium mb-2 dark:text-white">Servings</label>
                  <input 
                    type="number" 
                    value={formData.servings}
                    onChange={(e) => setFormData({...formData, servings: e.target.value})}
                    className="w-full border border-gray-300 dark:border-dark-border dark:bg-dark-border dark:text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors" 
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white dark:bg-dark-card rounded-xl border border-gray-200 dark:border-dark-border p-8">
            <h3 className="text-xl font-semibold mb-6 dark:text-white">Categories</h3>

            <div className="mb-8">
              <label className="block font-medium mb-3 dark:text-white">Meal Type *</label>
              <div className="flex flex-wrap gap-2">
                {mealTypes.map((type) => (
                  <span 
                    key={type}
                    onClick={() => toggleMealType(type)}
                    className={`px-4 py-2 border rounded-full cursor-pointer transition-colors text-sm ${
                      selectedMealTypes.includes(type) 
                        ? 'bg-orange-500 text-white border-orange-500' 
                        : 'border-gray-300 dark:border-dark-border hover:bg-gray-100 dark:hover:bg-dark-border dark:text-gray-300'
                    }`}
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-medium mb-3 dark:text-white">Diet</label>
              <div className="flex flex-wrap gap-2">
                {diets.map((diet) => (
                  <span 
                    key={diet}
                    onClick={() => toggleDiet(diet)}
                    className={`px-4 py-2 border rounded-full cursor-pointer transition-colors text-sm ${
                      selectedDiets.includes(diet) 
                        ? 'bg-orange-500 text-white border-orange-500' 
                        : 'border-gray-300 dark:border-dark-border hover:bg-gray-100 dark:hover:bg-dark-border dark:text-gray-300'
                    }`}
                  >
                    {diet}
                  </span>
                ))}
              </div>
            </div>
          </section>

          <section className="bg-white dark:bg-dark-card rounded-xl border border-gray-200 dark:border-dark-border p-8">
            <h3 className="text-xl font-semibold mb-6 dark:text-white">Ingredients *</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <input 
                  type="text" 
                  placeholder="e.g., 2 cups all-purpose flour"
                  value={currentIngredient}
                  onChange={(e) => setCurrentIngredient(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addIngredient())}
                  className="w-full border border-gray-300 dark:border-dark-border dark:bg-dark-border dark:text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors" 
                />
                <button 
                  type="button"
                  onClick={addIngredient}
                  className="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800 whitespace-nowrap text-sm"
                >
                  + Add
                </button>
              </div>
              {ingredients.length > 0 && (
                <ul className="space-y-2 mt-4">
                  {ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-center justify-between bg-gray-50 dark:bg-dark-border px-4 py-2 rounded-md">
                      <span className="text-sm dark:text-white">{ingredient}</span>
                      <button
                        type="button"
                        onClick={() => removeIngredient(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>

          <section className="bg-white dark:bg-dark-card rounded-xl border border-gray-200 dark:border-dark-border p-8">
            <h3 className="text-xl font-semibold mb-6 dark:text-white">Instructions *</h3>
            <div className="space-y-4">
              {instructions.map((instruction, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span className="bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-300 font-semibold px-3 py-1 rounded-full text-sm min-w-[2rem] text-center">
                    {index + 1}
                  </span>
                  <textarea 
                    placeholder={`Describe step ${index + 1}...`}
                    value={instruction}
                    onChange={(e) => updateInstruction(index, e.target.value)}
                    rows="2"
                    className="flex-1 border border-gray-300 dark:border-dark-border dark:bg-dark-border dark:text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors"
                  ></textarea>
                  {instructions.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeInstruction(index)}
                      className="text-red-500 hover:text-red-700 mt-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
              <button 
                type="button"
                onClick={addInstruction}
                className="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800 text-sm"
              >
                + Add Step
              </button>
            </div>
          </section>

          <section className="bg-white dark:bg-dark-card rounded-xl border border-gray-200 dark:border-dark-border p-8">
            <h3 className="text-xl font-semibold mb-6 dark:text-white">Nutrition Information (Optional)</h3>
            <div className="grid md:grid-cols-4 gap-6">
              <div>
                <label className="block font-medium mb-2 dark:text-white">Calories</label>
                <input 
                  type="number" 
                  placeholder="0"
                  value={formData.calories}
                  onChange={(e) => setFormData({...formData, calories: e.target.value})}
                  className="w-full border border-gray-300 dark:border-dark-border dark:bg-dark-border dark:text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors" 
                />
              </div>
              <div>
                <label className="block font-medium mb-2 dark:text-white">Protein (g)</label>
                <input 
                  type="number" 
                  placeholder="0"
                  value={formData.protein}
                  onChange={(e) => setFormData({...formData, protein: e.target.value})}
                  className="w-full border border-gray-300 dark:border-dark-border dark:bg-dark-border dark:text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors" 
                />
              </div>
              <div>
                <label className="block font-medium mb-2 dark:text-white">Carbs (g)</label>
                <input 
                  type="number" 
                  placeholder="0"
                  value={formData.carbs}
                  onChange={(e) => setFormData({...formData, carbs: e.target.value})}
                  className="w-full border border-gray-300 dark:border-dark-border dark:bg-dark-border dark:text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors" 
                />
              </div>
              <div>
                <label className="block font-medium mb-2 dark:text-white">Fat (g)</label>
                <input 
                  type="number" 
                  placeholder="0"
                  value={formData.fat}
                  onChange={(e) => setFormData({...formData, fat: e.target.value})}
                  className="w-full border border-gray-300 dark:border-dark-border dark:bg-dark-border dark:text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors" 
                />
              </div>
            </div>
          </section>

          <div className="flex justify-end gap-6 pt-6">
            <Link 
              to="/" 
              className="px-16 py-4 rounded-md border border-gray-300 dark:border-dark-border hover:bg-gray-100 dark:hover:bg-dark-border dark:text-white transition-colors text-sm font-medium"
            >
              Cancel
            </Link>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-gray-900 dark:bg-orange-500 text-white px-16 py-4 rounded-md hover:bg-gray-800 dark:hover:bg-orange-600 transition-colors text-sm font-medium disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Publishing...' : 'Publish Recipe'}
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}

export default AddRecipe







