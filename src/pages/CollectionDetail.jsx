import Navbar from '../components/Navbar'
import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { recipeAPI } from '../utils/api'

function CollectionDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [collection, setCollection] = useState(null)
  const [collections, setCollections] = useState([])
  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await recipeAPI.getAll()
        if (response.data.success) {
          setRecipes(response.data.recipes)
        }
      } catch (error) {
        console.error('Error fetching recipes:', error)
      }
    }
    fetchRecipes()

    const savedCollections = localStorage.getItem('recipe-collections')
    if (savedCollections) {
      const parsed = JSON.parse(savedCollections)
      setCollections(parsed)
      const found = parsed.find(c => c.id === parseInt(id))
      setCollection(found)
    }
  }, [id])

  useEffect(() => {
    if (collections.length > 0) {
      localStorage.setItem('recipe-collections', JSON.stringify(collections))
    }
  }, [collections])

  const toggleFavorite = () => {
    setCollections(collections.map(c => 
      c.id === collection.id ? { ...c, isFavorite: !c.isFavorite } : c
    ))
    setCollection(prev => ({ ...prev, isFavorite: !prev.isFavorite }))
  }

  const removeRecipe = (recipeId) => {
    const updatedCollection = {
      ...collection,
      recipeIds: collection.recipeIds.filter(id => id !== recipeId)
    }
    setCollection(updatedCollection)
    setCollections(collections.map(c => 
      c.id === collection.id ? updatedCollection : c
    ))
  }

  const deleteCollection = () => {
    if (window.confirm('Are you sure you want to delete this collection? All recipes will be removed from it.')) {
      const updatedCollections = collections.filter(c => c.id !== collection.id)
      setCollections(updatedCollections)
      localStorage.setItem('recipe-collections', JSON.stringify(updatedCollections))
      navigate('/collections')
    }
  }

  if (!collection) {
    return (
      <div className="bg-gray-50 text-gray-800 font-sans min-h-screen">
        <Navbar />
        <div className="container mx-auto px-6 py-12">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">Collection not found</h2>
            <Link to="/collections" className="text-orange-500 hover:underline">
              Back to Collections
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const getRecipeById = (id) => recipes.find(r => r._id === id || r.id === id)

  return (
    <div className="bg-gray-50 text-gray-800 font-sans min-h-screen">
      <Navbar />
     
      <div className="container mx-auto px-6 py-8">
        <Link 
          to="/collections" 
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Collections
        </Link>
        <div className={`${collection.color} ${collection.borderColor} border rounded-2xl p-8 mb-8`}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <h1 className="text-3xl font-bold text-gray-900">{collection.name}</h1>
                <button
                  onClick={toggleFavorite}
                  className={`p-2 rounded-full ${collection.isFavorite ? 'text-red-500 bg-red-50' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <svg className="w-6 h-6" fill={collection.isFavorite ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>
             
              {collection.description && (
                <p className="text-gray-600 text-lg mb-4">{collection.description}</p>
              )}
             
              <div className="flex items-center gap-6 text-gray-700">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Created: {collection.createdAt}</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{collection.recipeIds.length} recipes</span>
                </div>
              </div>
            </div>
           
            <div className="flex gap-3">
              <button
                onClick={() => navigate(`/explore?collection=${collection.id}`)}
                className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Recipes
              </button>
              <button
                onClick={deleteCollection}
                className="border border-red-300 text-red-600 px-6 py-3 rounded-lg hover:bg-red-50 flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Delete
              </button>
            </div>
          </div>
        </div>
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Recipes in this Collection</h2>
            <span className="text-gray-600">{collection.recipeIds.length} recipes</span>
          </div>
         
          {collection.recipeIds.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border">
              <div className="w-24 h-24 mx-auto mb-6 text-gray-300">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No recipes yet</h3>
              <p className="text-gray-600 mb-6">Add recipes to this collection to see them here</p>
              <button
                onClick={() => navigate('/explore')}
                className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800"
              >
                Browse Recipes
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {collection.recipeIds.map(recipeId => {
                const recipe = getRecipeById(recipeId)
                if (!recipe) return null
               
                return (
                  <div key={recipeId} className="bg-white rounded-xl border overflow-hidden hover:shadow-lg transition-shadow">
                    <Link to={`/recipe/${recipeId}`}>
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={recipe.image} 
                          alt={recipe.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </Link>
                   
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <Link to={`/recipe/${recipeId}`} className="flex-1">
                          <h3 className="font-semibold text-lg text-gray-900 hover:text-orange-500 transition-colors">
                            {recipe.title}
                          </h3>
                        </Link>
                        <button
                          onClick={() => removeRecipe(recipeId)}
                          className="text-gray-400 hover:text-red-500 ml-2"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                     
                      <p className="text-sm text-gray-600 mb-3">by {recipe.chef}</p>
                     
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>{recipe.time} min</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          <span>{recipe.servings}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-yellow-500">★</span>
                          <span>{recipe.rating}</span>
                        </div>
                      </div>
                     
                      <div className="flex flex-wrap gap-2">
                        {recipe.tags.map((tag, index) => (
                          <span key={index} className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CollectionDetail

