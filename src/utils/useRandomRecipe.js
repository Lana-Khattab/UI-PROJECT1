import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import recipes from '../data/recipes.json'

// React hook that returns a function which navigates to a random recipe path
// Uses the actual number of recipes in recipes.json as the max ID
export default function useRandomRecipe() {
  const navigate = useNavigate()
  const maxId = recipes.length

  const goRandom = useCallback(
    () => {
      const id = Math.floor(Math.random() * maxId) + 1
      navigate(`/recipe/${id}`)
    },
    [navigate, maxId]
  )

  return goRandom
}
