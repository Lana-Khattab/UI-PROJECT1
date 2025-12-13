import { useCallback, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { recipeAPI } from './api'

export default function useRandomRecipe() {
  const navigate = useNavigate()
  const [recipeIds, setRecipeIds] = useState([])

  useEffect(() => {
    const fetchRecipeIds = async () => {
      try {
        const response = await recipeAPI.getAll()
        const ids = response.data.recipes.map(r => r._id)
        setRecipeIds(ids)
      } catch (error) {
        console.error('Error fetching recipes:', error)
      }
    }
    fetchRecipeIds()
  }, [])

  const goRandom = useCallback(
    () => {
      if (recipeIds.length > 0) {
        const randomId = recipeIds[Math.floor(Math.random() * recipeIds.length)]
        navigate(`/recipe/${randomId}`)
      }
    },
    [navigate, recipeIds]
  )

  return goRandom
}
