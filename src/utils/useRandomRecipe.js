import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import recipes from '../data/recipes.json'

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
