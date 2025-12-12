import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import { recipeAPI } from '../utils/api'
import recipesJson from '../data/recipes.json'

function RecipeDetails() {
  const { id } = useParams()
  const [recipe, setRecipe] = useState(null)
  const [loading, setLoading] = useState(true)
  const [collections, setCollections] = useState([])
  const [showCollectionDropdown, setShowCollectionDropdown] = useState(false)

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true)
        
        let foundRecipe = null
        
        try {
          const response = await recipeAPI.getById(id)
          if (response.data.success) {
            foundRecipe = response.data.recipe
          }
        } catch (apiError) {
          console.log('Recipe not found in backend API')
        }
        
        if (!foundRecipe) {
          const localRecipe = recipesJson.find(r => String(r.id) === String(id))
          if (localRecipe) {
            foundRecipe = localRecipe
          }
        }
        
        setRecipe(foundRecipe)
      } catch (error) {
        console.error('Error fetching recipe:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRecipe()
  }, [id])

  useEffect(() => {
    const savedCollections = localStorage.getItem('recipe-collections')
    if (savedCollections) {
      setCollections(JSON.parse(savedCollections))
    }
  }, [])

  const addToCollection = (collectionId) => {
    const updatedCollections = collections.map(collection => {
      if (collection.id === collectionId && !collection.recipeIds.includes(parseInt(id))) {
        return { ...collection, recipeIds: [...collection.recipeIds, parseInt(id)] }
      }
      return collection
    })
    setCollections(updatedCollections)
    localStorage.setItem('recipe-collections', JSON.stringify(updatedCollections))
    setShowCollectionDropdown(false)
  }

  const isInCollection = (collectionId) => {
    const collection = collections.find(c => c.id === collectionId)
    return collection ? collection.recipeIds.includes(parseInt(id)) : false
  }

  if (loading) {
    return (
      <div className="bg-gray-50 text-gray-800 font-sans min-h-screen">
        <Navbar />
        <div className="container mx-auto px-6 py-12 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading recipe...</p>
        </div>
      </div>
    )
  }

  if (!recipe) {
    return (
      <div className="bg-gray-50 text-gray-800 font-sans min-h-screen">
        <Navbar />
        <div className="container mx-auto px-6 py-12">
          <h2 className="text-2xl font-semibold">Recipe not found</h2>
          <p className="text-sm text-gray-600 mt-2">No recipe matches the id `{id}`.</p>
          <div className="mt-4">
            <Link to="/" className="text-orange-500 hover:underline">Back</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 text-gray-800 font-sans min-h-screen">
      <Navbar />

      <section className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-col gap-6">
          <div className="w-full h-[400px] md:h-[500px] overflow-hidden rounded-2xl">
            <img 
              src={recipe.image} 
              alt={recipe.title}
              className="w-full h-full object-cover object-center"
            />
          </div>

          <div className="flex flex-col gap-3">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              {recipe.title}
            </h1>

            <div className="flex items-center gap-4 text-gray-700">
              <p className="text-base">
                by <span className="font-semibold text-gray-900">{recipe.chef}</span>
              </p>
              
              <div className="flex items-center gap-2">
                <span className="text-yellow-500 text-lg">★</span>
                <span className="font-semibold text-gray-900">{recipe.rating}</span>
                <span className="text-gray-600">({recipe.reviewsCount} reviews)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-0">
        <div className="bg-white rounded-2xl shadow-sm p-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex gap-8">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">Cook Time</p>
              <p className="font-semibold text-2xl text-gray-900">{recipe.time} min</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">Servings</p>
              <p className="font-semibold text-2xl text-gray-900">{recipe.servings}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">Rating</p>
              <p className="font-semibold text-2xl text-gray-900">{recipe.rating}/5</p>
            </div>
          </div>

          <div className="flex gap-3 w-full md:w-auto">
            <button className="bg-gray-900 text-white px-6 py-2 rounded-md w-full md:w-auto hover:bg-gray-800">Favorited</button>
            <button className="border border-gray-900 text-gray-900 px-6 py-2 rounded-md w-full md:w-auto hover:bg-gray-50">Add to Meal Plan</button>
            
            <div className="relative">
              <button 
                onClick={() => setShowCollectionDropdown(!showCollectionDropdown)}
                className="border border-gray-900 text-gray-900 px-6 py-2 rounded-md w-full md:w-auto hover:bg-gray-50 flex items-center gap-2"
              >
                Add to Collection
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {showCollectionDropdown && (
                <div className="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-lg z-10">
                  <div className="p-3 border-b">
                    <p className="text-sm font-medium text-gray-900">Save to Collection</p>
                    <p className="text-xs text-gray-500 mt-1">Add this recipe to a collection</p>
                  </div>
                  <div className="max-h-48 overflow-y-auto">
                    {collections.length === 0 ? (
                      <div className="p-3 text-center">
                        <p className="text-sm text-gray-500">No collections yet</p>
                      </div>
                    ) : (
                      collections.map((collection) => (
                        <button
                          key={collection.id}
                          onClick={() => addToCollection(collection.id)}
                          disabled={isInCollection(collection.id)}
                          className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-50 flex items-center justify-between ${
                            isInCollection(collection.id) ? 'opacity-50 cursor-not-allowed' : ''
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-3 h-3 rounded-full ${collection.color.replace('bg-', 'bg-').split(' ')[0]}`}></div>
                            <span>{collection.name}</span>
                          </div>
                          {isInCollection(collection.id) && (
                            <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </button>
                      ))
                    )}
                  </div>
                  <div className="border-t">
                    <Link 
                      to="/collections" 
                      onClick={() => setShowCollectionDropdown(false)}
                      className="px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                      </svg>
                      Create new collection
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="border-b mt-8 mb-6">
          <div className="flex text-sm font-medium">
            <div className="px-4 py-2 border-b-2 border-gray-900">Ingredients</div>
            <div className="px-4 py-2 text-gray-600">Instructions</div>
            <div className="px-4 py-2 text-gray-600">Nutrition</div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border mb-6">
          <h3 className="font-semibold mb-3">Ingredients</h3>
          <ul className="space-y-1 text-gray-700 text-sm">
            {recipe.ingredients.map((ing, idx) => (
              <li key={idx}>• {ing}</li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-xl p-6 border mb-6">
          <h3 className="font-semibold mb-3">Instructions</h3>
          <ol className="space-y-3 text-sm text-gray-700">
            {recipe.instructions.map((step, idx) => (
              <li key={idx}>{idx + 1}. {step}</li>
            ))}
          </ol>
        </div>

        <div className="bg-white rounded-xl p-6 border mb-10">
          <h3 className="font-semibold mb-3">Nutrition Facts</h3>
          <p className="text-sm text-gray-600 mb-6">Per serving</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <p className="text-2xl font-semibold text-orange-500">{recipe.nutrition.calories}</p>
              <p className="text-sm text-gray-600">Calories</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <p className="text-2xl font-semibold text-orange-500">{recipe.nutrition.protein}</p>
              <p className="text-sm text-gray-600">Protein</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <p className="text-2xl font-semibold text-orange-500">{recipe.nutrition.carbs}</p>
              <p className="text-sm text-gray-600">Carbs</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <p className="text-2xl font-semibold text-orange-500">{recipe.nutrition.fat}</p>
              <p className="text-sm text-gray-600">Fat</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border mb-6">
          <h3 className="font-semibold mb-3">Mood Based</h3>
          <div className="flex flex-wrap gap-2">
            {recipe.mood && recipe.mood.map((m, i) => (
              <span key={i} className="border border-gray-300 rounded-full px-4 py-1 text-sm">{m}</span>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border mb-6">
          <h3 className="font-semibold mb-3">Suitable Season</h3>
          <div className="border border-gray-200 rounded-md bg-gray-50 px-4 py-3 text-sm text-gray-600">{recipe.season}</div>
        </div>

        <div className="bg-white rounded-xl p-6 border mb-6">
          <h3 className="font-semibold mb-3">Add a Comment</h3>
          <textarea 
            placeholder="Share your thoughts about this recipe..." 
            className="w-full bg-gray-50 border border-gray-200 rounded-md p-3 text-sm text-gray-700 focus:ring-2 focus:ring-orange-500 focus:outline-none" 
            rows="3"
          ></textarea>
          <div className="flex justify-end mt-3">
            <button className="bg-gray-900 text-white px-6 py-2 rounded-md text-sm hover:bg-gray-800">Submit</button>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border mb-8">
          <h3 className="font-semibold mb-4">Reviews ({recipe.reviewsCount || (recipe.reviews && recipe.reviews.length) || 0})</h3>
          <div className="space-y-4">
            {(recipe.reviews && recipe.reviews.length > 0) ? (
              recipe.reviews.map((rev, idx) => (
                <div key={idx} className={idx === recipe.reviews.length - 1 ? 'pb-4' : 'border-b pb-4'}>
                  <div className="flex justify-between items-start mb-1">
                    <p className="font-semibold">{rev.author}</p>
                    <p className="text-sm text-gray-500">{rev.when}</p>
                  </div>
                  <p className="text-gray-700 text-sm">{rev.text}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-600">No reviews yet.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default RecipeDetails