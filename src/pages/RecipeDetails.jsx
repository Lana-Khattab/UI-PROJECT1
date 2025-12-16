import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from '../components/Navbar'
import PlanWeekModal from '../components/PlanWeekModal'
import { recipeAPI, userAPI, collectionAPI } from '../utils/api'
import { useAuth } from '../context/AuthContext'

function RecipeDetails() {
  const { id } = useParams()
  const { user } = useAuth()
  const [recipe, setRecipe] = useState(null)
  const [loading, setLoading] = useState(true)
  const [collections, setCollections] = useState([])
  const [showCollectionDropdown, setShowCollectionDropdown] = useState(false)
  const [activeTab, setActiveTab] = useState('ingredients')
  const [comment, setComment] = useState('')
  const [submittingReview, setSubmittingReview] = useState(false)
  const [reviewError, setReviewError] = useState('')
  const [isFavorited, setIsFavorited] = useState(false)
  const [favoritesLoading, setFavoritesLoading] = useState(false)
  const [showMealPlanModal, setShowMealPlanModal] = useState(false)
  const [collectionsLoading, setCollectionsLoading] = useState(false)

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true)
        const response = await recipeAPI.getById(id)
        if (response.data.success) {
          setRecipe(response.data.recipe)
        }
      } catch (error) {
        console.error('Error fetching recipe:', error)
        setRecipe(null)
      } finally {
        setLoading(false)
      }
    }

    fetchRecipe()
  }, [id])

  useEffect(() => {
    const fetchCollections = async () => {
      if (!user) {
        setCollections([])
        setCollectionsLoading(false)
        return
      }

      try {
        setCollectionsLoading(true)
        const response = await collectionAPI.getMyCollections()
        if (response.data.success) {
          setCollections(response.data.collections)
        }
      } catch (error) {
        console.error('Error fetching collections:', error)
        setCollections([])
      } finally {
        setCollectionsLoading(false)
      }
    }

    fetchCollections()
  }, [user])

  useEffect(() => {
    const checkIfFavorited = async () => {
      if (!user) {
        setIsFavorited(false)
        return
      }

      try {
        const response = await userAPI.getFavorites()
        if (response.data.success) {
          const favoriteIds = response.data.favorites.map(fav => fav._id || fav)
          setIsFavorited(favoriteIds.includes(id))
        }
      } catch (error) {
        console.error('Error checking favorites:', error)
      }
    }

    checkIfFavorited()
  }, [user, id])

  const toggleFavorite = async () => {
    if (!user) {
      setReviewError('Please login to add favorites')
      return
    }

    setFavoritesLoading(true)
    try {
      if (isFavorited) {
        await userAPI.removeFromFavorites(id)
        setIsFavorited(false)
      } else {
        await userAPI.addToFavorites(id)
        setIsFavorited(true)
      }
    } catch (error) {
      console.error('Error toggling favorite:', error)
      setReviewError(error.response?.data?.message || 'Failed to update favorites')
    } finally {
      setFavoritesLoading(false)
    }
  }

  const addToCollection = async (collectionId) => {
    if (!user) {
      setReviewError('Please login to add to collection')
      return
    }

    try {
      const response = await collectionAPI.addRecipe(collectionId, id)
      if (response.data.success) {
        const updatedResponse = await collectionAPI.getMyCollections()
        if (updatedResponse.data.success) {
          setCollections(updatedResponse.data.collections)
        }
        setShowCollectionDropdown(false)
      }
    } catch (error) {
      console.error('Error adding to collection:', error)
      setReviewError(error.response?.data?.message || 'Failed to add to collection')
    }
  }

  const isInCollection = (collectionId) => {
    const collection = collections.find(c => c._id === collectionId)
    if (!collection || !collection.recipes) return false
    const recipeIds = collection.recipes.map(r => typeof r === 'string' ? r : r._id)
    return recipeIds.includes(id)
  }

  const handleSubmitReview = async () => {
    if (!user) {
      setReviewError('Please login to submit a review')
      return
    }

    if (!comment.trim()) {
      setReviewError('Please enter a comment')
      return
    }

    setSubmittingReview(true)
    setReviewError('')

    try {
      const response = await recipeAPI.addReview(id, { text: comment })
      
      if (response.data.success) {
        setRecipe(response.data.recipe)
        setComment('')
        setReviewError('')
      }
    } catch (error) {
      console.error('Error submitting review:', error)
      const errorMsg = error.response?.data?.message || error.message || 'Failed to submit review. This recipe may not exist in the database.'
      setReviewError(errorMsg)
    } finally {
      setSubmittingReview(false)
    }
  }

  if (loading) {
    return (
      <div className="bg-gray-50 dark:bg-dark-bg text-gray-800 dark:text-dark-text font-sans min-h-screen transition-colors">
        <Navbar />
        <div className="container mx-auto px-6 py-12 text-center">
          <motion.div 
            className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <p className="mt-4 text-gray-600 dark:text-dark-muted">Loading recipe...</p>
        </div>
      </div>
    )
  }

  if (!recipe) {
    return (
      <div className="bg-gray-50 dark:bg-dark-bg text-gray-800 dark:text-dark-text font-sans min-h-screen transition-colors">
        <Navbar />
        <motion.div 
          className="container mx-auto px-6 py-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-2xl font-semibold dark:text-dark-text">Recipe not found</h2>
          <p className="text-sm text-gray-600 dark:text-dark-muted mt-2">No recipe matches the id `{id}`.</p>
          <div className="mt-4">
            <Link to="/" className="text-orange-500 hover:underline focus:outline-none focus:ring-2 focus:ring-orange-500 rounded">Back</Link>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 dark:bg-dark-bg text-gray-800 dark:text-dark-text font-sans min-h-screen transition-colors">
      <Navbar />

      <motion.section 
        className="max-w-6xl mx-auto px-6 py-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col gap-6">
          <motion.div 
            className="w-full h-[400px] md:h-[500px] overflow-hidden rounded-2xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img 
              src={recipe.image} 
              alt={recipe.title}
              className="w-full h-full object-cover object-center"
            />
          </motion.div>

          <motion.div 
            className="flex flex-col gap-3"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-dark-text">
              {recipe.title}
            </h1>

            <div className="flex items-center gap-4 text-gray-700 dark:text-dark-muted">
              <p className="text-base">
                by <span className="font-semibold text-gray-900 dark:text-dark-text">{recipe.chef}</span>
              </p>
              
              <div className="flex items-center gap-2" role="group" aria-label="Rating information">
                <span className="text-yellow-500 text-lg" aria-hidden="true">★</span>
                <span className="font-semibold text-gray-900 dark:text-dark-text">{recipe.rating}</span>
                <span className="text-gray-600 dark:text-dark-muted">({recipe.reviewsCount} reviews)</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <section className="max-w-6xl mx-auto px-6 pb-12">
        <motion.div 
          className="bg-white dark:bg-dark-card rounded-2xl shadow-sm dark:shadow-orange-500/5 p-8 flex flex-col md:flex-row justify-between items-center gap-8 border dark:border-dark-border transition-colors"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex gap-8" role="group" aria-label="Recipe information">
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-dark-muted mb-2">Cook Time</p>
              <p className="font-semibold text-2xl text-gray-900 dark:text-dark-text">{recipe.time} min</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-dark-muted mb-2">Servings</p>
              <p className="font-semibold text-2xl text-gray-900 dark:text-dark-text">{recipe.servings}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-dark-muted mb-2">Rating</p>
              <p className="font-semibold text-2xl text-gray-900 dark:text-dark-text">{recipe.rating}/5</p>
            </div>
          </div>

          <nav className="flex gap-3 w-full md:w-auto" aria-label="Recipe actions">
            <motion.button 
              onClick={toggleFavorite}
              disabled={favoritesLoading || !user}
              className={`${
                isFavorited 
                  ? 'bg-orange-600 text-white hover:bg-orange-700' 
                  : 'bg-gray-900 dark:bg-orange-600 text-white hover:bg-gray-800 dark:hover:bg-orange-700'
              } px-6 py-2 rounded-md w-full md:w-auto focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
              whileHover={{ scale: favoritesLoading || !user ? 1 : 1.02 }}
              whileTap={{ scale: favoritesLoading || !user ? 1 : 0.98 }}
              aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
            >
              {favoritesLoading ? 'Loading...' : isFavorited ? '❤️ Favorited' : '🤍 Favorite'}
            </motion.button>
            <motion.button 
              onClick={() => {
                if (!user) {
                  setReviewError('Please login to add to meal plan')
                  return
                }
                setShowMealPlanModal(true)
              }}
              className="border border-gray-900 dark:border-dark-border text-gray-900 dark:text-dark-text px-6 py-2 rounded-md w-full md:w-auto hover:bg-gray-50 dark:hover:bg-dark-border focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              aria-label="Add to meal plan"
            >
              Add to Meal Plan
            </motion.button>
            
            <div className="relative">
              <motion.button 
                onClick={() => setShowCollectionDropdown(!showCollectionDropdown)}
                className="border border-gray-900 dark:border-dark-border text-gray-900 dark:text-dark-text px-6 py-2 rounded-md w-full md:w-auto hover:bg-gray-50 dark:hover:bg-dark-border flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                aria-label="Add to collection"
                aria-expanded={showCollectionDropdown}
              >
                Add to Collection
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </motion.button>
              
              <AnimatePresence>
                {showCollectionDropdown && (
                  <motion.div 
                    className="absolute right-0 mt-2 w-64 bg-white dark:bg-dark-card border dark:border-dark-border rounded-lg shadow-lg dark:shadow-orange-500/10 z-10"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="p-3 border-b dark:border-dark-border">
                      <p className="text-sm font-medium text-gray-900 dark:text-dark-text">Save to Collection</p>
                      <p className="text-xs text-gray-500 dark:text-dark-muted mt-1">Add this recipe to a collection</p>
                    </div>
                    <div className="max-h-48 overflow-y-auto">
                      {collectionsLoading ? (
                        <div className="p-3 text-center">
                          <p className="text-sm text-gray-500 dark:text-dark-muted">Loading collections...</p>
                        </div>
                      ) : collections.length === 0 ? (
                        <div className="p-3 text-center">
                          <p className="text-sm text-gray-500 dark:text-dark-muted">No collections yet</p>
                        </div>
                      ) : (
                        collections.map((collection) => (
                          <button
                            key={collection._id}
                            onClick={() => addToCollection(collection._id)}
                            disabled={isInCollection(collection._id)}
                            className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-50 dark:hover:bg-dark-border dark:text-dark-text flex items-center justify-between transition-colors focus:outline-none focus:bg-gray-100 dark:focus:bg-dark-border ${
                              isInCollection(collection._id) ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-3 h-3 rounded-full bg-orange-500" aria-hidden="true"></div>
                              <span>{collection.name}</span>
                            </div>
                            {isInCollection(collection._id) && (
                              <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-label="Already in collection">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </button>
                        ))
                      )}
                    </div>
                    <div className="border-t dark:border-dark-border">
                      <Link 
                        to="/collections" 
                        onClick={() => setShowCollectionDropdown(false)}
                        className="px-4 py-3 text-sm text-gray-700 dark:text-dark-muted hover:bg-gray-50 dark:hover:bg-dark-border flex items-center gap-2 transition-colors focus:outline-none focus:bg-gray-100 dark:focus:bg-dark-border"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                        Create new collection
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>
        </motion.div>

        <motion.nav 
          className="border-b dark:border-dark-border mt-8 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          role="tablist"
          aria-label="Recipe details"
        >
          <div className="flex text-sm font-medium">
            <button 
              onClick={() => setActiveTab('ingredients')}
              className={`px-4 py-2 border-b-2 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                activeTab === 'ingredients' 
                  ? 'border-orange-500 text-orange-500' 
                  : 'border-transparent text-gray-600 dark:text-dark-muted hover:text-gray-900 dark:hover:text-dark-text'
              }`}
              role="tab"
              aria-selected={activeTab === 'ingredients'}
              aria-controls="ingredients-panel"
            >
              Ingredients
            </button>
            <button 
              onClick={() => setActiveTab('instructions')}
              className={`px-4 py-2 border-b-2 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                activeTab === 'instructions' 
                  ? 'border-orange-500 text-orange-500' 
                  : 'border-transparent text-gray-600 dark:text-dark-muted hover:text-gray-900 dark:hover:text-dark-text'
              }`}
              role="tab"
              aria-selected={activeTab === 'instructions'}
              aria-controls="instructions-panel"
            >
              Instructions
            </button>
            <button 
              onClick={() => setActiveTab('nutrition')}
              className={`px-4 py-2 border-b-2 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                activeTab === 'nutrition' 
                  ? 'border-orange-500 text-orange-500' 
                  : 'border-transparent text-gray-600 dark:text-dark-muted hover:text-gray-900 dark:hover:text-dark-text'
              }`}
              role="tab"
              aria-selected={activeTab === 'nutrition'}
              aria-controls="nutrition-panel"
            >
              Nutrition
            </button>
          </div>
        </motion.nav>

        <AnimatePresence mode="wait">
          {activeTab === 'ingredients' && (
            <motion.div 
              key="ingredients"
              className="bg-white dark:bg-dark-card rounded-xl p-6 border dark:border-dark-border mb-6 transition-colors"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              role="tabpanel"
              id="ingredients-panel"
            >
              <h3 className="font-semibold mb-3 dark:text-dark-text">Ingredients</h3>
              <ul className="space-y-1 text-gray-700 dark:text-dark-muted text-sm" role="list">
                {recipe.ingredients.map((ing, idx) => (
                  <li key={idx}>• {ing}</li>
                ))}
              </ul>
            </motion.div>
          )}

          {activeTab === 'instructions' && (
            <motion.div 
              key="instructions"
              className="bg-white dark:bg-dark-card rounded-xl p-6 border dark:border-dark-border mb-6 transition-colors"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              role="tabpanel"
              id="instructions-panel"
            >
              <h3 className="font-semibold mb-3 dark:text-dark-text">Instructions</h3>
              <ol className="space-y-3 text-sm text-gray-700 dark:text-dark-muted" role="list">
                {recipe.instructions.map((step, idx) => (
                  <li key={idx}>{idx + 1}. {step}</li>
                ))}
              </ol>
            </motion.div>
          )}

          {activeTab === 'nutrition' && (
            <motion.div 
              key="nutrition"
              className="bg-white dark:bg-dark-card rounded-xl p-6 border dark:border-dark-border mb-10 transition-colors"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              role="tabpanel"
              id="nutrition-panel"
            >
              <h3 className="font-semibold mb-3 dark:text-dark-text">Nutrition Facts</h3>
              <p className="text-sm text-gray-600 dark:text-dark-muted mb-6">Per serving</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <motion.div 
                  className="bg-gray-50 dark:bg-dark-border rounded-lg p-4 text-center transition-colors"
                  whileHover={{ scale: 1.05 }}
                >
                  <p className="text-2xl font-semibold text-orange-500">{recipe.nutrition.calories}</p>
                  <p className="text-sm text-gray-600 dark:text-dark-muted">Calories</p>
                </motion.div>
                <motion.div 
                  className="bg-gray-50 dark:bg-dark-border rounded-lg p-4 text-center transition-colors"
                  whileHover={{ scale: 1.05 }}
                >
                  <p className="text-2xl font-semibold text-orange-500">{recipe.nutrition.protein}</p>
                  <p className="text-sm text-gray-600 dark:text-dark-muted">Protein</p>
                </motion.div>
                <motion.div 
                  className="bg-gray-50 dark:bg-dark-border rounded-lg p-4 text-center transition-colors"
                  whileHover={{ scale: 1.05 }}
                >
                  <p className="text-2xl font-semibold text-orange-500">{recipe.nutrition.carbs}</p>
                  <p className="text-sm text-gray-600 dark:text-dark-muted">Carbs</p>
                </motion.div>
                <motion.div 
                  className="bg-gray-50 dark:bg-dark-border rounded-lg p-4 text-center transition-colors"
                  whileHover={{ scale: 1.05 }}
                >
                  <p className="text-2xl font-semibold text-orange-500">{recipe.nutrition.fat}</p>
                  <p className="text-sm text-gray-600 dark:text-dark-muted">Fat</p>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div 
          className="bg-white dark:bg-dark-card rounded-xl p-6 border dark:border-dark-border mb-6 transition-colors"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="font-semibold mb-3 dark:text-dark-text">Mood Based</h3>
          <div className="flex flex-wrap gap-2">
            {recipe.mood && recipe.mood.map((m, i) => (
              <motion.span 
                key={i} 
                className="border border-gray-300 dark:border-dark-border rounded-full px-4 py-1 text-sm dark:text-dark-text transition-colors"
                whileHover={{ scale: 1.05, borderColor: '#f97316' }}
              >
                {m}
              </motion.span>
            ))}
          </div>
        </motion.div>

        <motion.div 
          className="bg-white dark:bg-dark-card rounded-xl p-6 border dark:border-dark-border mb-6 transition-colors"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="font-semibold mb-3 dark:text-dark-text">Suitable Season</h3>
          <div className="border border-gray-200 dark:border-dark-border rounded-md bg-gray-50 dark:bg-dark-border px-4 py-3 text-sm text-gray-600 dark:text-dark-muted transition-colors">{recipe.season}</div>
        </motion.div>

        <motion.div 
          className="bg-white dark:bg-dark-card rounded-xl p-6 border dark:border-dark-border mb-6 transition-colors"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <h3 className="font-semibold mb-3 dark:text-dark-text">Add a Comment</h3>
          {!user && (
            <p className="text-sm text-orange-500 mb-2">Please <Link to="/login" className="underline">login</Link> to submit a review</p>
          )}
          {reviewError && (
            <p className="text-sm text-red-500 mb-2">{reviewError}</p>
          )}
          <label htmlFor="comment-textarea" className="sr-only">Your comment</label>
          <textarea 
            id="comment-textarea"
            placeholder="Share your thoughts about this recipe..." 
            className="w-full bg-gray-50 dark:bg-dark-border border border-gray-200 dark:border-dark-border rounded-md p-3 text-sm text-gray-700 dark:text-dark-text focus:ring-2 focus:ring-orange-500 focus:outline-none transition-colors" 
            rows="3"
            aria-label="Comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            disabled={!user || submittingReview}
          ></textarea>
          <div className="flex justify-end mt-3">
            <motion.button 
              className="bg-gray-900 dark:bg-orange-600 text-white px-6 py-2 rounded-md text-sm hover:bg-gray-800 dark:hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: !user || submittingReview ? 1 : 1.02 }}
              whileTap={{ scale: !user || submittingReview ? 1 : 0.98 }}
              onClick={handleSubmitReview}
              disabled={!user || submittingReview}
            >
              {submittingReview ? 'Submitting...' : 'Submit'}
            </motion.button>
          </div>
        </motion.div>

        <motion.div 
          className="bg-white dark:bg-dark-card rounded-xl p-6 border dark:border-dark-border mb-8 transition-colors"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h3 className="font-semibold mb-4 dark:text-dark-text">Reviews ({recipe.reviewsCount || (recipe.reviews && recipe.reviews.length) || 0})</h3>
          <div className="space-y-4" role="list">
            {(recipe.reviews && recipe.reviews.length > 0) ? (
              recipe.reviews.map((rev, idx) => (
                <motion.div 
                  key={idx} 
                  className={idx === recipe.reviews.length - 1 ? 'pb-4' : 'border-b dark:border-dark-border pb-4'}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + (idx * 0.1) }}
                >
                  <div className="flex justify-between items-start mb-1">
                    <p className="font-semibold dark:text-dark-text">{rev.author}</p>
                    <p className="text-sm text-gray-500 dark:text-dark-muted">{rev.when}</p>
                  </div>
                  <p className="text-gray-700 dark:text-dark-muted text-sm">{rev.text}</p>
                </motion.div>
              ))
            ) : (
              <p className="text-sm text-gray-600 dark:text-dark-muted">No reviews yet.</p>
            )}
          </div>
        </motion.div>
      </section>

      <PlanWeekModal 
        isOpen={showMealPlanModal}
        onClose={() => setShowMealPlanModal(false)}
        onSave={(mealPlan) => {
          console.log('Meal plan saved:', mealPlan)
          setShowMealPlanModal(false)
        }}
        weekStartDate={new Date()}
      />
    </div>
  )
}

export default RecipeDetails