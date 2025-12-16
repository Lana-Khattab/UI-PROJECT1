import Navbar from '../components/Navbar'
import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { recipeAPI, userAPI } from '../utils/api'
import { useAuth } from '../context/AuthContext'

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
      const response = await recipeAPI.getAll()
      if (response.data.success) {
        setRecipes(response.data.recipes)
      }
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
      <div className="bg-gray-50 dark:bg-dark-bg text-gray-800 dark:text-dark-text font-sans min-h-screen transition-colors">
        <Navbar />
        <div className="container mx-auto px-6 py-8">
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <p className="text-gray-600 dark:text-dark-muted">Loading recipes...</p>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 dark:bg-dark-bg text-gray-800 dark:text-dark-text font-sans min-h-screen transition-colors">
      <Navbar />
      
      <motion.div 
        className="container mx-auto px-6 py-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-8 dark:text-dark-text">Recipe Explorer</h1>

        <motion.div 
          className="mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <input 
            type="text" 
            placeholder="Search recipes, ingredients, or keywords..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 border dark:border-dark-border rounded-lg bg-white dark:bg-dark-card dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors" 
          />
        </motion.div>

        <motion.div 
          className="bg-white dark:bg-dark-card p-6 rounded-lg shadow-sm dark:shadow-orange-500/5 mb-8 border dark:border-dark-border transition-colors"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="mb-4">
            <span className="font-semibold dark:text-dark-text">Filters</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm text-gray-600 dark:text-dark-muted mb-2 block transition-colors">Cuisine</label>
              <select 
                value={selectedCuisine}
                onChange={(e) => setSelectedCuisine(e.target.value)}
                className="w-full px-4 py-2 border dark:border-dark-border rounded-lg bg-white dark:bg-dark-border dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors"
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
              <label className="text-sm text-gray-600 dark:text-dark-muted mb-2 block transition-colors">Diet</label>
              <select 
                value={selectedDiet}
                onChange={(e) => setSelectedDiet(e.target.value)}
                className="w-full px-4 py-2 border dark:border-dark-border rounded-lg bg-white dark:bg-dark-border dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors"
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
              <label className="text-sm text-gray-600 dark:text-dark-muted mb-2 block transition-colors">Meal Type</label>
              <select 
                value={selectedMealType}
                onChange={(e) => setSelectedMealType(e.target.value)}
                className="w-full px-4 py-2 border dark:border-dark-border rounded-lg bg-white dark:bg-dark-border dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors"
              >
                <option>All</option>
                <option>Breakfast</option>
                <option>Lunch</option>
                <option>Dinner</option>
                <option>Dessert</option>
              </select>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex gap-4 border-b dark:border-dark-border transition-colors">
            <motion.button 
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 font-medium transition-colors ${activeTab === 'all' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-600 dark:text-dark-muted hover:text-orange-500'}`}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              All Recipes
            </motion.button>
            <motion.button 
              onClick={() => setActiveTab('favorites')}
              className={`px-4 py-2 font-medium transition-colors ${activeTab === 'favorites' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-600 dark:text-dark-muted hover:text-orange-500'}`}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              My Favorites ({favorites.length})
            </motion.button>
          </div>
        </motion.div>

        <div className="mb-4 text-gray-600 dark:text-dark-muted transition-colors">Showing {filteredRecipes.length} recipes</div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredRecipes.map((recipe, index) => {
            const recipeId = recipe._id || recipe.id
            return (
              <motion.div 
                key={recipeId} 
                className="bg-white dark:bg-dark-card rounded-xl border dark:border-dark-border overflow-hidden hover:shadow-lg dark:hover:shadow-orange-500/10 transition-all"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                whileHover={{ y: -5 }}
              >
                <Link to={`/recipe/${recipeId}`}>
                  <div className="relative">
                    <img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover" />
                    <span className="absolute top-2 left-2 bg-white dark:bg-dark-card px-2 py-1 rounded-full text-xs font-medium dark:text-dark-text transition-colors">{recipe.difficulty || 'Medium'}</span>
                    <motion.button 
                      onClick={(e) => {
                        e.preventDefault()
                        toggleFavorite(recipeId)
                      }}
                      className="absolute top-2 right-2 p-2 bg-white dark:bg-dark-card rounded-full hover:bg-gray-100 dark:hover:bg-dark-border transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <svg className={`w-5 h-5 ${favorites.includes(recipeId) ? 'text-red-500 fill-current' : 'text-gray-600 dark:text-dark-muted'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </motion.button>
                  </div>
                </Link>
                <div className="p-4">
                  <Link to={`/recipe/${recipeId}`}>
                    <h3 className="font-semibold mb-2 dark:text-dark-text hover:text-orange-500 transition-colors">{recipe.title}</h3>
                  </Link>
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-dark-muted mb-3 transition-colors">
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
                    <span key={index} className="text-xs px-2 py-1 bg-gray-100 dark:bg-dark-border dark:text-dark-text rounded-full transition-colors">{tag}</span>
                  ))}
                </div>
              </div>
            </motion.div>
            )
          })}
        </div>
      </motion.div>
    </div>
  )
}

export default Explore
