import Navbar from '../components/Navbar'
import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { recipeAPI, userAPI } from '../utils/api'
import { useAuth } from '../context/AuthContext'
import recipesJson from '../data/recipes.json'

function Explore() {
  const [searchParams] = useSearchParams()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCuisine, setSelectedCuisine] = useState('All')
  const [selectedDiet, setSelectedDiet] = useState('All')
  const [selectedMealType, setSelectedMealType] = useState('All')
  const [activeTab, setActiveTab] = useState('all')
  const [recipes, setRecipes] = useState([])
  const [favorites, setFavorites] = useState([])
  const [loading, setLoading] = useState(true)
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    const tabParam = searchParams.get('tab')
    const cuisineParam = searchParams.get('cuisine')
    
    if (tabParam === 'favorites') {
      setActiveTab('favorites')
    }
    
    if (cuisineParam) {
      setSelectedCuisine(cuisineParam)
    }
  }, [searchParams])

  useEffect(() => {
    loadRecipes()
    if (isAuthenticated) {
      loadFavorites()
    }
  }, [isAuthenticated])

  const loadRecipes = async () => {
    try {
      let allRecipes = []
      
      try {
        const response = await recipeAPI.getAll()
        if (response.data.success) {
          allRecipes = response.data.recipes
        }
      } catch (error) {
        console.log('Could not fetch recipes from backend:', error)
      }
      
      const localRecipes = recipesJson.map(recipe => ({
        ...recipe,
        _id: recipe.id
      }))
      
      allRecipes = [...allRecipes, ...localRecipes]
      
      setRecipes(allRecipes)
    } catch (error) {
      console.error('Error loading recipes:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadFavorites = async () => {
    try {
      const response = await userAPI.getFavorites()
      if (response.data.success) {
        setFavorites(response.data.favorites.map(fav => fav._id))
      }
    } catch (error) {
      console.error('Error loading favorites:', error)
    }
  }

  const toggleFavorite = async (id) => {
    if (!isAuthenticated) {
      alert('Please login to add favorites')
      return
    }

    try {
      if (favorites.includes(id)) {
        await userAPI.removeFromFavorites(id)
        setFavorites(prev => prev.filter(fav => fav !== id))
      } else {
        await userAPI.addToFavorites(id)
        setFavorites(prev => [...prev, id])
      }
    } catch (error) {
      console.error('Error toggling favorite:', error)
    }
  }

  const filteredRecipes = recipes.filter(recipe => {
    const recipeTags = recipe.tags || []
    const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         recipeTags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesCuisine = selectedCuisine === 'All' || recipeTags.includes(selectedCuisine)
    const matchesDiet = selectedDiet === 'All' || recipeTags.includes(selectedDiet)
    const matchesMealType = selectedMealType === 'All' || recipeTags.includes(selectedMealType)
    const recipeId = recipe._id || recipe.id
    const matchesTab = activeTab === 'all' || (activeTab === 'favorites' && favorites.includes(recipeId))

    return matchesSearch && matchesCuisine && matchesDiet && matchesMealType && matchesTab
  })

  if (loading) {
    return (
      <div className="bg-gray-50 text-gray-800 font-sans min-h-screen">
        <Navbar />
        <div className="container mx-auto px-6 py-8">
          <div className="text-center py-12">Loading recipes...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 text-gray-800 font-sans min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-8">Recipe Explorer</h1>

        <div className="mb-6">
          <input 
            type="text" 
            placeholder="Search recipes, ingredients, or keywords..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" 
          />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <div className="mb-4">
            <span className="font-semibold">Filters</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm text-gray-600 mb-2 block">Cuisine</label>
              <select 
                value={selectedCuisine}
                onChange={(e) => setSelectedCuisine(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option>All</option>
                <option>Italian</option>
                <option>American</option>
                <option>Mediterranean</option>
                <option>Japanese</option>
                <option>Indian</option>
                <option>French</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-gray-600 mb-2 block">Diet</label>
              <select 
                value={selectedDiet}
                onChange={(e) => setSelectedDiet(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option>All</option>
                <option>Vegetarian</option>
                <option>Vegan</option>
                <option>Gluten-Free</option>
                <option>Keto</option>
                <option>Pescatarian</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-gray-600 mb-2 block">Meal Type</label>
              <select 
                value={selectedMealType}
                onChange={(e) => setSelectedMealType(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option>All</option>
                <option>Breakfast</option>
                <option>Lunch</option>
                <option>Dinner</option>
                <option>Dessert</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex gap-4 border-b">
            <button 
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 font-medium ${activeTab === 'all' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-600 hover:text-orange-500'}`}
            >
              All Recipes
            </button>
            <button 
              onClick={() => setActiveTab('favorites')}
              className={`px-4 py-2 font-medium ${activeTab === 'favorites' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-600 hover:text-orange-500'}`}
            >
              My Favorites ({favorites.length})
            </button>
          </div>
        </div>

        <div className="mb-4 text-gray-600">Showing {filteredRecipes.length} recipes</div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredRecipes.map((recipe) => {
            const recipeId = recipe._id || recipe.id
            return (
              <div key={recipeId} className="bg-white rounded-xl border overflow-hidden hover:shadow-lg transition-shadow">
                <Link to={`/recipe/${recipeId}`}>
                  <div className="relative">
                    <img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover" />
                    <span className="absolute top-2 left-2 bg-white px-2 py-1 rounded-full text-xs font-medium">{recipe.difficulty || 'Medium'}</span>
                    <button 
                      onClick={(e) => {
                        e.preventDefault()
                        toggleFavorite(recipeId)
                      }}
                      className="absolute top-2 right-2 p-2 bg-white rounded-full hover:bg-gray-100"
                    >
                      <svg className={`w-5 h-5 ${favorites.includes(recipeId) ? 'text-red-500 fill-current' : 'text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                </Link>
                <div className="p-4">
                  <Link to={`/recipe/${recipeId}`}>
                    <h3 className="font-semibold mb-2 hover:text-orange-500 transition-colors">{recipe.title}</h3>
                  </Link>
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{recipe.time} min</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span style={{fontSize: '10px'}}>⭐</span>
                    <span>{recipe.rating}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {(recipe.tags || []).slice(0, 3).map((tag, index) => (
                    <span key={index} className="text-xs px-2 py-1 bg-gray-100 rounded-full">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Explore
