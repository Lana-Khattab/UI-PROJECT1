// Utility functions for collection management

// Get all collections from localStorage
export const getCollections = () => {
  const saved = localStorage.getItem('recipe-collections')
  return saved ? JSON.parse(saved) : []
}

// Save collections to localStorage
export const saveCollections = (collections) => {
  localStorage.setItem('recipe-collections', JSON.stringify(collections))
}

// Add recipe to collection
export const addToCollection = (collectionId, recipeId) => {
  const collections = getCollections()
  const updatedCollections = collections.map(collection => {
    if (collection.id === collectionId && !collection.recipeIds.includes(recipeId)) {
      return { ...collection, recipeIds: [...collection.recipeIds, recipeId] }
    }
    return collection
  })
  saveCollections(updatedCollections)
  return updatedCollections
}

// Remove recipe from collection
export const removeFromCollection = (collectionId, recipeId) => {
  const collections = getCollections()
  const updatedCollections = collections.map(collection => {
    if (collection.id === collectionId) {
      return { 
        ...collection, 
        recipeIds: collection.recipeIds.filter(id => id !== recipeId) 
      }
    }
    return collection
  })
  saveCollections(updatedCollections)
  return updatedCollections
}

// Create new collection
export const createCollection = (name, description = '') => {
  const collections = getCollections()
  const newCollection = {
    id: Date.now(),
    name,
    description,
    recipeIds: [],
    isFavorite: false,
    color: 'bg-gray-50',
    borderColor: 'border-gray-200',
    createdAt: new Date().toISOString().split('T')[0]
  }
  const updatedCollections = [...collections, newCollection]
  saveCollections(updatedCollections)
  return updatedCollections
}

// Check if recipe is in any collection
export const isRecipeInCollections = (recipeId) => {
  const collections = getCollections()
  return collections.some(collection => 
    collection.recipeIds.includes(recipeId)
  )
}

// Get collections containing a specific recipe
export const getCollectionsForRecipe = (recipeId) => {
  const collections = getCollections()
  return collections.filter(collection => 
    collection.recipeIds.includes(recipeId)
  )
}

