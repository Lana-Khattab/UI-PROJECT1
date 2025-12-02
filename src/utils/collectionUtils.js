export const getCollections = () => {
  const saved = localStorage.getItem('recipe-collections')
  return saved ? JSON.parse(saved) : []
}

export const saveCollections = (collections) => {
  localStorage.setItem('recipe-collections', JSON.stringify(collections))
}

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

export const isRecipeInCollections = (recipeId) => {
  const collections = getCollections()
  return collections.some(collection => 
    collection.recipeIds.includes(recipeId)
  )
}

export const getCollectionsForRecipe = (recipeId) => {
  const collections = getCollections()
  return collections.filter(collection => 
    collection.recipeIds.includes(recipeId)
  )
}

