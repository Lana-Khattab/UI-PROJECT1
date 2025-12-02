import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'

function AddRecipe() {
  return (
    <div className="bg-gray-50 text-gray-800 font-sans min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-6 py-10 max-w-4xl">
        <Link to="/" className="flex items-center text-gray-600 hover:text-orange-500 mb-6 transition-colors">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </Link>

        <h2 className="text-3xl font-bold mb-2">Create New Recipe</h2>
        <p className="text-gray-600 mb-8">Share your culinary creation with the Foodies community</p>

        <form className="space-y-8">
          <section className="bg-white rounded-xl border p-8">
            <h3 className="text-xl font-semibold mb-6">Basic Information</h3>
            <div className="grid gap-6">
              <div>
                <label className="block font-medium mb-2">Recipe Title *</label>
                <input 
                  type="text" 
                  placeholder="e.g., Creamy Garlic Pasta"
                  className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500" 
                />
              </div>

              <div>
                <label className="block font-medium mb-2">Description *</label>
                <textarea 
                  placeholder="Describe your recipe..." 
                  rows="4"
                  className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                ></textarea>
              </div>

              <div>
                <label className="block font-medium mb-2">Image URL</label>
                <input 
                  type="text" 
                  placeholder="https://example.com/image.jpg"
                  className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500" 
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-medium mb-2">Cuisine *</label>
                  <select className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500">
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
                  <label className="block font-medium mb-2">Difficulty</label>
                  <select className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500">
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-medium mb-2">Cook Time (minutes)</label>
                  <input 
                    type="number" 
                    defaultValue="30"
                    className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500" 
                  />
                </div>
                <div>
                  <label className="block font-medium mb-2">Servings</label>
                  <input 
                    type="number" 
                    defaultValue="4"
                    className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500" 
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-xl border p-8">
            <h3 className="text-xl font-semibold mb-6">Categories</h3>

            <div className="mb-8">
              <label className="block font-medium mb-3">Meal Type *</label>
              <div className="flex flex-wrap gap-2">
                <span className="px-4 py-2 border rounded-full cursor-pointer hover:bg-gray-100 transition-colors text-sm">Breakfast</span>
                <span className="px-4 py-2 border rounded-full cursor-pointer hover:bg-gray-100 transition-colors text-sm">Lunch</span>
                <span className="px-4 py-2 border rounded-full cursor-pointer hover:bg-gray-100 transition-colors text-sm">Dinner</span>
                <span className="px-4 py-2 border rounded-full cursor-pointer hover:bg-gray-100 transition-colors text-sm">Dessert</span>
                <span className="px-4 py-2 border rounded-full cursor-pointer hover:bg-gray-100 transition-colors text-sm">Snack</span>
              </div>
            </div>

            <div>
              <label className="block font-medium mb-3">Diet</label>
              <div className="flex flex-wrap gap-2">
                <span className="px-4 py-2 border rounded-full hover:bg-gray-100 cursor-pointer transition-colors text-sm">Vegetarian</span>
                <span className="px-4 py-2 border rounded-full hover:bg-gray-100 cursor-pointer transition-colors text-sm">Vegan</span>
                <span className="px-4 py-2 border rounded-full hover:bg-gray-100 cursor-pointer transition-colors text-sm">Gluten-Free</span>
                <span className="px-4 py-2 border rounded-full hover:bg-gray-100 cursor-pointer transition-colors text-sm">Keto</span>
                <span className="px-4 py-2 border rounded-full hover:bg-gray-100 cursor-pointer transition-colors text-sm">Pescatarian</span>
                <span className="px-4 py-2 border rounded-full hover:bg-gray-100 cursor-pointer transition-colors text-sm">Dairy-Free</span>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-xl border p-8">
            <h3 className="text-xl font-semibold mb-6">Ingredients *</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <input 
                  type="text" 
                  placeholder="e.g., 2 cups all-purpose flour"
                  className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500" 
                />
                <button 
                  type="button" 
                  className="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800 whitespace-nowrap text-sm"
                >
                  + Add
                </button>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-xl border p-8">
            <h3 className="text-xl font-semibold mb-6">Instructions *</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="bg-orange-100 text-orange-600 font-semibold px-3 py-1 rounded-full text-sm min-w-[2rem] text-center">1</span>
                <textarea 
                  placeholder="Describe the first step..." 
                  rows="2"
                  className="flex-1 border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                ></textarea>
              </div>
              <button 
                type="button" 
                className="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800 text-sm"
              >
                + Add Step
              </button>
            </div>
          </section>

          <section className="bg-white rounded-xl border p-8">
            <h3 className="text-xl font-semibold mb-6">Nutrition Information (Optional)</h3>
            <div className="grid md:grid-cols-4 gap-6">
              <div>
                <label className="block font-medium mb-2">Calories</label>
                <input 
                  type="number" 
                  placeholder="0"
                  className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500" 
                />
              </div>
              <div>
                <label className="block font-medium mb-2">Protein (g)</label>
                <input 
                  type="number" 
                  placeholder="0"
                  className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500" 
                />
              </div>
              <div>
                <label className="block font-medium mb-2">Carbs (g)</label>
                <input 
                  type="number" 
                  placeholder="0"
                  className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500" 
                />
              </div>
              <div>
                <label className="block font-medium mb-2">Fat (g)</label>
                <input 
                  type="number" 
                  placeholder="0"
                  className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500" 
                />
              </div>
            </div>
          </section>

          <div className="flex justify-end gap-6 pt-6">
            <Link 
              to="/" 
              className="px-16 py-4 rounded-md border border-gray-300 hover:bg-gray-100 transition-colors text-sm font-medium"
            >
              Cancel
            </Link>
            <button 
              type="submit" 
              className="bg-gray-900 text-white px-16 py-4 rounded-md hover:bg-gray-800 transition-colors text-sm font-medium"
            >
              Publish Recipe
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}

export default AddRecipe
