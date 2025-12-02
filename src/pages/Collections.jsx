import Navbar from '../components/Navbar'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import recipes from '../data/recipes.json'

function Collections() {
  // State for collections (loaded from localStorage)
  const [collections, setCollections] = useState([])
  const [newCollectionName, setNewCollectionName] = useState('')
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [editingCollection, setEditingCollection] = useState(null)
  const [editName, setEditName] = useState('')

  // Load collections from localStorage on mount
  useEffect(() => {
    const savedCollections = localStorage.getItem('recipe-collections')
    if (savedCollections) {
      setCollections(JSON.parse(savedCollections))
    } else {
      // Initialize with default collections
      const defaultCollections = [
        {
          id: 1,
          name: 'Quick & Easy',
          description: 'Recipes under 30 minutes',
          recipeIds: [1, 3, 6, 7],
          isFavorite: true,
          color: 'bg-blue-50',
          borderColor: 'border-blue-200',
          createdAt: '2024-10-15'
        },
        {
          id: 2,
          name: 'Healthy Options',
          description: 'Nutritious and balanced meals',
          recipeIds: [2, 4, 11, 13],
          isFavorite: false,
          color: 'bg-green-50',
          borderColor: 'border-green-200',
          createdAt: '2024-10-20'
        },
        {
          id: 3,
          name: 'Weekend Specials',
          description: 'For when you have more time',
          recipeIds: [5, 8, 9, 10, 12],
          isFavorite: true,
          color: 'bg-purple-50',
          borderColor: 'border-purple-200',
          createdAt: '2024-10-25'
        },
        {
          id: 4,
          name: 'Vegetarian Favorites',
          description: 'Meat-free delicious options',
          recipeIds: [1, 3, 6, 9, 11, 12, 13],
          isFavorite: false,
          color: 'bg-emerald-50',
          borderColor: 'border-emerald-200',
          createdAt: '2024-11-01'
        }
      ]
      setCollections(defaultCollections)
      localStorage.setItem('recipe-collections', JSON.stringify(defaultCollections))
    }
  }, [])

  // Save collections to localStorage whenever they change
  useEffect(() => {
    if (collections.length > 0) {
      localStorage.setItem('recipe-collections', JSON.stringify(collections))
    }
  }, [collections])

  // Get recipe details by ID
  const getRecipeById = (id) => {
    return recipes.find(recipe => recipe.id === id)
  }

  // Create new collection
  const handleCreateCollection = (e) => {
    e.preventDefault()
    if (!newCollectionName.trim()) return

    const newCollection = {
      id: Date.now(),
      name: newCollectionName,
      description: '',
      recipeIds: [],
      isFavorite: false,
      color: 'bg-gray-50',
      borderColor: 'border-gray-200',
      createdAt: new Date().toISOString().split('T')[0]
    }

    setCollections([...collections, newCollection])
    setNewCollectionName('')
    setShowCreateForm(false)
  }

  // Delete collection
  const handleDeleteCollection = (collectionId) => {
    if (window.confirm('Are you sure you want to delete this collection?')) {
      setCollections(collections.filter(collection => collection.id !== collectionId))
    }
  }

  // Toggle favorite for collection
  const toggleCollectionFavorite = (collectionId) => {
    setCollections(collections.map(collection => 
      collection.id === collectionId 
        ? { ...collection, isFavorite: !collection.isFavorite }
        : collection
    ))
  }

  // Add recipe to collection (this would be called from recipe details)
  const addRecipeToCollection = (collectionId, recipeId) => {
    setCollections(collections.map(collection => {
      if (collection.id === collectionId && !collection.recipeIds.includes(recipeId)) {
        return { ...collection, recipeIds: [...collection.recipeIds, recipeId] }
      }
      return collection
    }))
  }

  // Remove recipe from collection
  const removeRecipeFromCollection = (collectionId, recipeId) => {
    setCollections(collections.map(collection => {
      if (collection.id === collectionId) {
        return { 
          ...collection, 
          recipeIds: collection.recipeIds.filter(id => id !== recipeId) 
        }
      }
      return collection
    }))
  }

  // Update collection name
  const handleUpdateCollectionName = (collectionId) => {
    if (!editName.trim()) return
    setCollections(collections.map(collection => 
      collection.id === collectionId 
        ? { ...collection, name: editName }
        : collection
    ))
    setEditingCollection(null)
    setEditName('')
  }

  // Get favorite collections count
  const favoriteCollectionsCount = collections.filter(c => c.isFavorite).length

  // Get total recipes across all collections
  const totalRecipesInCollections = collections.reduce((total, collection) => 
    total + collection.recipeIds.length, 0
  )

  return (
    <div className="bg-gray-50 text-gray-800 font-sans min-h-screen">
      <Navbar />
     
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Collections</h1>
            <p className="text-gray-600 mt-2">
              Organize your favorite recipes into custom collections
            </p>
          </div>
         
          <button
            onClick={() => setShowCreateForm(true)}
            className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            Create New Collection
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Collections</p>
                <p className="text-2xl font-bold text-gray-900">{collections.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Favorite Collections</p>
                <p className="text-2xl font-bold text-gray-900">{favoriteCollectionsCount}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.682-7.682 1.06-1.06a5.5 5.5 0 000-6.364z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Recipes Saved</p>
                <p className="text-2xl font-bold text-gray-900">{totalRecipesInCollections}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Create Collection Modal/Form */}
        {showCreateForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-8 max-w-md w-full">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Create New Collection</h2>
                <button
                  onClick={() => setShowCreateForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
             
              <form onSubmit={handleCreateCollection}>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Collection Name
                  </label>
                  <input
                    type="text"
                    value={newCollectionName}
                    onChange={(e) => setNewCollectionName(e.target.value)}
                    placeholder="e.g., Italian Recipes, Desserts"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    autoFocus
                  />
                </div>
               
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowCreateForm(false)}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-gray-900 text-white px-4 py-3 rounded-lg hover:bg-gray-800"
                  >
                    Create Collection
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit Collection Name Modal */}
        {editingCollection && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-8 max-w-md w-full">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Edit Collection Name</h2>
                <button
                  onClick={() => {
                    setEditingCollection(null)
                    setEditName('')
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
             
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Name
                </label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  autoFocus
                />
              </div>
             
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setEditingCollection(null)
                    setEditName('')
                  }}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleUpdateCollectionName(editingCollection)}
                  className="flex-1 bg-gray-900 text-white px-4 py-3 rounded-lg hover:bg-gray-800"
                >
                  Update Name
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {collections.map((collection) => (
            <div 
              key={collection.id} 
              className={`${collection.color} ${collection.borderColor} border rounded-xl overflow-hidden hover:shadow-lg transition-shadow`}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">
                        {collection.name}
                      </h3>
                      {collection.isFavorite && (
                        <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.682-7.682 1.06-1.06a5.5 5.5 0 000-6.364z" />
                        </svg>
                      )}
                    </div>
                   
                    {collection.description && (
                      <p className="text-gray-600 text-sm mb-3">{collection.description}</p>
                    )}
                   
                    <p className="text-gray-700">
                      <span className="font-semibold">{collection.recipeIds.length}</span> recipes
                    </p>
                    <p className="text-gray-500 text-sm mt-1">
                      Created: {collection.createdAt}
                    </p>
                  </div>
                 
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => toggleCollectionFavorite(collection.id)}
                      className={`p-2 rounded-full ${collection.isFavorite ? 'text-red-500 hover:text-red-600' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                      <svg className="w-5 h-5" fill={collection.isFavorite ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                   
                    <button
                      onClick={() => handleDeleteCollection(collection.id)}
                      className="p-2 text-gray-400 hover:text-red-500 rounded-full"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Recipes Preview */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Recipes in this collection:</h4>
                  <div className="space-y-2">
                    {collection.recipeIds.slice(0, 3).map(recipeId => {
                      const recipe = getRecipeById(recipeId)
                      if (!recipe) return null
                      return (
                        <div key={recipeId} className="flex items-center justify-between bg-white/50 rounded-lg p-2">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded overflow-hidden">
                              <img 
                                src={recipe.image} 
                                alt={recipe.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900 truncate max-w-[150px]">
                                {recipe.title}
                              </p>
                              <p className="text-xs text-gray-500">{recipe.time} min</p>
                            </div>
                          </div>
                          <button
                            onClick={() => removeRecipeFromCollection(collection.id, recipeId)}
                            className="text-gray-400 hover:text-red-500 p-1"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      )
                    })}
                   
                    {collection.recipeIds.length > 3 && (
                      <p className="text-sm text-gray-500 text-center">
                        + {collection.recipeIds.length - 3} more recipes
                      </p>
                    )}
                   
                    {collection.recipeIds.length === 0 && (
                      <p className="text-sm text-gray-400 text-center py-2">
                        No recipes yet. Add some!
                      </p>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <Link 
                    to={`/collection/${collection.id}`}
                    className="flex-1 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-800 text-center"
                  >
                    View Collection
                  </Link>
                  <button
                    onClick={() => {
                      setEditingCollection(collection.id)
                      setEditName(collection.name)
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {collections.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 text-gray-300">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No collections yet</h3>
            <p className="text-gray-600 mb-6">Create your first collection to organize recipes</p>
            <button
              onClick={() => setShowCreateForm(true)}
              className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800"
            >
              Create Your First Collection
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Collections
