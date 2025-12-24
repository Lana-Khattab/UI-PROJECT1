import Navbar from '../components/Navbar'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { collectionAPI } from '../utils/api'

function Collections() {
  const [collections, setCollections] = useState([])
  const [recipes, setRecipes] = useState([])
  const [newCollectionName, setNewCollectionName] = useState('')
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [editingCollection, setEditingCollection] = useState(null)
  const [editName, setEditName] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        setLoading(true)
        const token = localStorage.getItem('token')
        if (!token) {
          setError('Please login to view collections')
          setLoading(false)
          return
        }

        const response = await collectionAPI.getMyCollections()

        if (response.data.success) {
          setCollections(response.data.collections || [])
        } else {
          setError('Failed to fetch collections')
        }
      } catch (err) {
        console.error('Error fetching collections:', err)
        setError(err.response?.data?.message || 'Failed to fetch collections')
      } finally {
        setLoading(false)
      }
    }

    fetchCollections()
  }, [])

  const handleCreateCollection = async (e) => {
    e.preventDefault()
    if (!newCollectionName.trim()) return

    try {
      const response = await collectionAPI.create({
        name: newCollectionName,
        description: ''
      })

      if (response.data.success) {
        setCollections([...collections, response.data.collection])
        setNewCollectionName('')
        setShowCreateForm(false)
      }
    } catch (err) {
      console.error('Error creating collection:', err)
      alert(err.response?.data?.message || 'Failed to create collection')
    }
  }

  const handleDeleteCollection = async (collectionId) => {
    if (!window.confirm('Are you sure you want to delete this collection?')) {
      return
    }

    try {
      const response = await collectionAPI.delete(collectionId)

      if (response.data.success) {
        setCollections(collections.filter(collection => collection._id !== collectionId))
      }
    } catch (err) {
      console.error('Error deleting collection:', err)
      alert(err.response?.data?.message || 'Failed to delete collection')
    }
  }

  const toggleCollectionFavorite = async (collectionId) => {
    try {
      const collection = collections.find(c => c._id === collectionId)
      if (!collection) return

      const response = await collectionAPI.update(collectionId, {
        isFavorite: !collection.isFavorite
      })

      if (response.data.success) {
        setCollections(collections.map(c => 
          c._id === collectionId ? { ...c, isFavorite: !c.isFavorite } : c
        ))
      }
    } catch (err) {
      console.error('Error updating collection:', err)
      alert(err.response?.data?.message || 'Failed to update collection')
    }
  }

  const addRecipeToCollection = async (collectionId, recipeId) => {
    try {
      const response = await collectionAPI.addRecipe(collectionId, recipeId)

      if (response.data.success) {
        setCollections(collections.map(collection => {
          if (collection._id === collectionId) {
            return response.data.collection
          }
          return collection
        }))
      }
    } catch (err) {
      console.error('Error adding recipe to collection:', err)
      alert(err.response?.data?.message || 'Failed to add recipe to collection')
    }
  }

  const removeRecipeFromCollection = async (collectionId, recipeId) => {
    try {
      const response = await collectionAPI.removeRecipe(collectionId, recipeId)

      if (response.data.success) {
        setCollections(collections.map(collection => {
          if (collection._id === collectionId) {
            return response.data.collection
          }
          return collection
        }))
      }
    } catch (err) {
      console.error('Error removing recipe from collection:', err)
      alert(err.response?.data?.message || 'Failed to remove recipe from collection')
    }
  }

  const handleUpdateCollectionName = async (collectionId) => {
    if (!editName.trim()) return

    try {
      const response = await collectionAPI.update(collectionId, { name: editName })

      if (response.data.success) {
        setCollections(collections.map(collection => 
          collection._id === collectionId 
            ? { ...collection, name: editName }
            : collection
        ))
        setEditingCollection(null)
        setEditName('')
      }
    } catch (err) {
      console.error('Error updating collection name:', err)
      alert(err.response?.data?.message || 'Failed to update collection name')
    }
  }

  // Calculate statistics
  const favoriteCollectionsCount = collections.filter(c => c.isFavorite).length
  const totalRecipesInCollections = collections.reduce((total, collection) => 
    total + (collection.recipes?.length || 0), 0
  )

  // Loading state
  if (loading) {
    return (
      <div className="bg-gray-50 dark:bg-dark-bg min-h-screen">
        <Navbar />
        <div className="container mx-auto px-6 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
              <p className="mt-4 text-gray-600 dark:text-dark-muted">Loading collections...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="bg-gray-50 dark:bg-dark-bg min-h-screen">
        <Navbar />
        <div className="container mx-auto px-6 py-8">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
            <div className="flex items-center">
              <svg className="w-6 h-6 text-red-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h3 className="text-lg font-semibold text-red-800 dark:text-red-300">Error</h3>
                <p className="text-red-600 dark:text-red-400 mt-1">{error}</p>
              </div>
            </div>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 px-4 py-2 rounded hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
            >
              Retry
            </button>
          </div>
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
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-dark-text transition-colors">My Collections</h1>
            <p className="text-gray-600 dark:text-dark-muted mt-2 transition-colors">
              Organize your favorite recipes into custom collections
            </p>
          </div>
         
          <motion.button
            onClick={() => setShowCreateForm(true)}
            className="bg-gray-900 dark:bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-gray-800 dark:hover:bg-orange-600 transition-colors flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            Create New Collection
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div 
            className="bg-white dark:bg-dark-card rounded-xl border dark:border-dark-border p-6 transition-colors"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-dark-muted transition-colors">Total Collections</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-dark-text transition-colors">{collections.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center transition-colors">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="bg-white dark:bg-dark-card rounded-xl border dark:border-dark-border p-6 transition-colors"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-dark-muted transition-colors">Favorite Collections</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-dark-text transition-colors">{favoriteCollectionsCount}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center transition-colors">
                <svg className="w-6 h-6 text-red-600 dark:text-red-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.682-7.682 1.06-1.06a5.5 5.5 0 000-6.364z" />
                </svg>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="bg-white dark:bg-dark-card rounded-xl border dark:border-dark-border p-6 transition-colors"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-dark-muted transition-colors">Total Recipes Saved</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-dark-text transition-colors">{totalRecipesInCollections}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center transition-colors">
                <svg className="w-6 h-6 text-green-600 dark:text-green-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </motion.div>
        </div>

        <AnimatePresence>
        {showCreateForm && (
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-white dark:bg-dark-card rounded-xl p-8 max-w-md w-full border dark:border-dark-border transition-colors"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold dark:text-dark-text transition-colors">Create New Collection</h2>
                <motion.button
                  onClick={() => setShowCreateForm(false)}
                  className="text-gray-500 dark:text-dark-muted hover:text-gray-700 dark:hover:text-dark-text transition-colors"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              </div>
             
              <form onSubmit={handleCreateCollection}>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-2 transition-colors">
                    Collection Name
                  </label>
                  <input
                    type="text"
                    value={newCollectionName}
                    onChange={(e) => setNewCollectionName(e.target.value)}
                    placeholder="e.g., Italian Recipes, Desserts"
                    className="w-full px-4 py-3 border dark:border-dark-border border-gray-300 rounded-lg bg-white dark:bg-dark-border dark:text-dark-text focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                    autoFocus
                  />
                </div>
               
                <div className="flex gap-3">
                  <motion.button
                    type="button"
                    onClick={() => setShowCreateForm(false)}
                    className="flex-1 px-4 py-3 border dark:border-dark-border border-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-border dark:text-dark-text transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    type="submit"
                    className="flex-1 bg-gray-900 dark:bg-orange-500 text-white px-4 py-3 rounded-lg hover:bg-gray-800 dark:hover:bg-orange-600 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Create Collection
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
        </AnimatePresence>

        <AnimatePresence>
        {editingCollection && (
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-white dark:bg-dark-card rounded-xl p-8 max-w-md w-full border dark:border-dark-border transition-colors"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold dark:text-dark-text transition-colors">Edit Collection Name</h2>
                <motion.button
                  onClick={() => {
                    setEditingCollection(null)
                    setEditName('')
                  }}
                  className="text-gray-500 dark:text-dark-muted hover:text-gray-700 dark:hover:text-dark-text transition-colors"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              </div>
             
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-2 transition-colors">
                  New Name
                </label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-4 py-3 border dark:border-dark-border border-gray-300 rounded-lg bg-white dark:bg-dark-border dark:text-dark-text focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                  autoFocus
                />
              </div>
             
              <div className="flex gap-3">
                <motion.button
                  onClick={() => {
                    setEditingCollection(null)
                    setEditName('')
                  }}
                  className="flex-1 px-4 py-3 border dark:border-dark-border border-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-border dark:text-dark-text transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  onClick={() => handleUpdateCollectionName(editingCollection)}
                  className="flex-1 bg-gray-900 dark:bg-orange-500 text-white px-4 py-3 rounded-lg hover:bg-gray-800 dark:hover:bg-orange-600 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Update Name
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
        </AnimatePresence>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {collections.map((collection, index) => (
            <motion.div 
              key={collection._id} 
              className="bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-xl overflow-hidden hover:shadow-lg transition-all"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-dark-text transition-colors">
                        {collection.name}
                      </h3>
                      {collection.isFavorite && (
                        <motion.svg 
                          className="w-5 h-5 text-red-500" 
                          fill="currentColor" 
                          viewBox="0 0 24 24"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 500 }}
                        >
                          <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.682-7.682 1.06-1.06a5.5 5.5 0 000-6.364z" />
                        </motion.svg>
                      )}
                    </div>
                   
                    {collection.description && (
                      <p className="text-gray-600 dark:text-dark-muted text-sm mb-3 transition-colors">{collection.description}</p>
                    )}
                   
                    <p className="text-gray-700 dark:text-dark-text transition-colors">
                      <span className="font-semibold">{collection.recipes?.length || 0}</span> recipes
                    </p>
                    <p className="text-gray-500 dark:text-dark-muted text-sm mt-1 transition-colors">
                      Created: {new Date(collection.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                 
                  <div className="flex flex-col gap-2">
                    <motion.button
                      onClick={() => toggleCollectionFavorite(collection._id)}
                      className={`p-2 rounded-full transition-colors ${collection.isFavorite ? 'text-red-500 hover:text-red-600' : 'text-gray-400 dark:text-dark-muted hover:text-gray-600 dark:hover:text-dark-text'}`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <svg className="w-5 h-5" fill={collection.isFavorite ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </motion.button>
                   
                    <motion.button
                      onClick={() => handleDeleteCollection(collection._id)}
                      className="p-2 text-gray-400 dark:text-dark-muted hover:text-red-500 dark:hover:text-red-400 rounded-full transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </motion.button>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-dark-text mb-3 transition-colors">Recipes in this collection:</h4>
                  <div className="space-y-2">
                    {collection.recipes?.slice(0, 3).map(recipe => (
                      <motion.div 
                        key={recipe._id} 
                        className="flex items-center justify-between bg-gray-50 dark:bg-dark-border rounded-lg p-2 transition-colors"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        whileHover={{ x: 5 }}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded overflow-hidden">
                            <img 
                              src={recipe.image} 
                              alt={recipe.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-dark-text truncate max-w-[150px] transition-colors">
                              {recipe.title}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-dark-muted transition-colors">{recipe.time} min</p>
                          </div>
                        </div>
                        <motion.button
                          onClick={() => removeRecipeFromCollection(collection._id, recipe._id)}
                          className="text-gray-400 dark:text-dark-muted hover:text-red-500 dark:hover:text-red-400 p-1 transition-colors"
                          whileHover={{ scale: 1.2, rotate: 90 }}
                          whileTap={{ scale: 0.8 }}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </motion.button>
                      </motion.div>
                    ))}
                   
                    {collection.recipes?.length > 3 && (
                      <p className="text-sm text-gray-500 dark:text-dark-muted text-center transition-colors">
                        + {collection.recipes.length - 3} more recipes
                      </p>
                    )}
                   
                    {(!collection.recipes || collection.recipes.length === 0) && (
                      <p className="text-sm text-gray-400 dark:text-dark-muted text-center py-2 transition-colors">
                        No recipes yet. Add some!
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Link 
                    to={`/collection/${collection._id}`}
                    className="flex-1 bg-gray-900 dark:bg-orange-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-800 dark:hover:bg-orange-600 text-center transition-colors"
                  >
                    View Collection
                  </Link>
                  <motion.button
                    onClick={() => {
                      setEditingCollection(collection._id)
                      setEditName(collection.name)
                    }}
                    className="px-4 py-2 border dark:border-dark-border border-gray-300 rounded-lg text-sm hover:bg-gray-50 dark:hover:bg-dark-border dark:text-dark-text transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Edit
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {collections.length === 0 && (
          <motion.div 
            className="text-center py-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="w-24 h-24 mx-auto mb-6 text-gray-300 dark:text-dark-muted transition-colors">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-dark-text mb-2 transition-colors">No collections yet</h3>
            <p className="text-gray-600 dark:text-dark-muted mb-6 transition-colors">Create your first collection to organize recipes</p>
            <motion.button
              onClick={() => setShowCreateForm(true)}
              className="bg-gray-900 dark:bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-gray-800 dark:hover:bg-orange-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Create Your First Collection
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}

export default Collections
