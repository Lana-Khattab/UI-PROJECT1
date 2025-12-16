import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useState, useEffect } from 'react'
import { recipeAPI, dashboardAPI } from '../utils/api'

function PlanWeekModal({ isOpen, onClose, onSave, weekStartDate }) {
  const [recipes, setRecipes] = useState([])
  const [selectedRecipes, setSelectedRecipes] = useState({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  const mealTypes = ['breakfast', 'lunch', 'dinner']

  useEffect(() => {
    if (isOpen) {
      fetchRecipes()
    }
  }, [isOpen])

  const fetchRecipes = async () => {
    try {
      setLoading(true)
      const response = await recipeAPI.getAll()
      setRecipes(response.data.recipes || [])
    } catch (error) {
      console.error('Error fetching recipes:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleRecipeSelect = (day, mealType, recipe) => {
    setSelectedRecipes(prev => ({
      ...prev,
      [`${day}-${mealType}`]: recipe
    }))
  }

  const handleAutoFill = () => {
    const newSelections = {}
    let recipeIndex = 0

    days.forEach(day => {
      mealTypes.forEach(mealType => {
        if (recipes.length > 0) {
          newSelections[`${day}-${mealType}`] = recipes[recipeIndex % recipes.length]
          recipeIndex++
        }
      })
    })

    setSelectedRecipes(newSelections)
  }

  const handleClear = () => {
    setSelectedRecipes({})
  }

  const handleSave = async () => {
    try {
      setSaving(true)
      
      const mealPlanData = {}
      days.forEach(day => {
        mealPlanData[day] = {}
        mealTypes.forEach(mealType => {
          const recipe = getSelectedRecipe(day, mealType)
          mealPlanData[day][mealType] = recipe ? {
            id: recipe._id,
            title: recipe.title,
            time: recipe.time,
            image: recipe.image,
            servings: recipe.servings
          } : null
        })
      })

      console.log('Saving meal plan:', mealPlanData)
      console.log('Week start date:', weekStartDate)
      const response = await dashboardAPI.saveMealPlan(mealPlanData, weekStartDate)
      console.log('Save response:', response.data)
      
      alert('Meal plan saved successfully!')
      
      if (onSave) {
        onSave(mealPlanData)
      }
      
      onClose()
    } catch (error) {
      console.error('Error saving meal plan:', error)
      console.error('Error response:', error.response?.data)
      alert(`Failed to save meal plan: ${error.response?.data?.message || error.message}`)
    } finally {
      setSaving(false)
    }
  }

  const getSelectedRecipe = (day, mealType) => {
    return selectedRecipes[`${day}-${mealType}`]
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-4 md:inset-10 bg-white dark:bg-dark-card rounded-xl shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            <div className="flex items-center justify-between p-4 md:p-6 border-b dark:border-dark-border">
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-dark-text">Plan Next Week</h2>
                <p className="text-sm text-gray-600 dark:text-dark-muted mt-1">Select meals for each day</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-dark-border rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-600 dark:text-dark-muted" />
              </button>
            </div>

            <div className="flex items-center gap-3 p-4 border-b dark:border-dark-border">
              <motion.button
                onClick={handleAutoFill}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm font-medium"
              >
                Auto-fill Week
              </motion.button>
              <motion.button
                onClick={handleClear}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-4 py-2 border dark:border-dark-border rounded-lg hover:bg-gray-50 dark:hover:bg-dark-border transition-colors text-sm font-medium"
              >
                Clear All
              </motion.button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-6">
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-gray-600 dark:text-dark-muted">Loading recipes...</div>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                  {days.map(day => (
                    <motion.div
                      key={day}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-gray-50 dark:bg-dark-bg rounded-lg p-4 border dark:border-dark-border"
                    >
                      <h3 className="font-bold text-gray-900 dark:text-dark-text mb-3">{day}</h3>
                      <div className="space-y-3">
                        {mealTypes.map(mealType => (
                          <div key={mealType}>
                            <label className="text-xs font-medium text-gray-600 dark:text-dark-muted uppercase mb-1 block">
                              {mealType}
                            </label>
                            <select
                              value={getSelectedRecipe(day, mealType)?._id || ''}
                              onChange={(e) => {
                                const recipe = recipes.find(r => r._id === e.target.value)
                                handleRecipeSelect(day, mealType, recipe)
                              }}
                              className="w-full px-3 py-2 border dark:border-dark-border rounded-md text-sm bg-white dark:bg-dark-card dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-orange-500"
                            >
                              <option value="">Select a recipe</option>
                              {recipes.map(recipe => (
                                <option key={recipe._id} value={recipe._id}>
                                  {recipe.title} ({recipe.time})
                                </option>
                              ))}
                            </select>
                            {getSelectedRecipe(day, mealType) && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mt-2 p-2 bg-white dark:bg-dark-card rounded border dark:border-dark-border"
                              >
                                <div className="flex items-center gap-2">
                                  {getSelectedRecipe(day, mealType).image && (
                                    <img
                                      src={getSelectedRecipe(day, mealType).image}
                                      alt={getSelectedRecipe(day, mealType).title}
                                      className="w-12 h-12 rounded object-cover"
                                    />
                                  )}
                                  <div className="flex-1 min-w-0">
                                    <p className="text-xs font-medium text-gray-900 dark:text-dark-text truncate">
                                      {getSelectedRecipe(day, mealType).title}
                                    </p>
                                    <p className="text-xs text-gray-600 dark:text-dark-muted">
                                      {getSelectedRecipe(day, mealType).time} • {getSelectedRecipe(day, mealType).servings} servings
                                    </p>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between p-4 md:p-6 border-t dark:border-dark-border">
              <p className="text-sm text-gray-600 dark:text-dark-muted">
                {Object.keys(selectedRecipes).length} of 21 meals planned
              </p>
              <div className="flex gap-3">
                <motion.button
                  onClick={onClose}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-2 border dark:border-dark-border rounded-lg hover:bg-gray-50 dark:hover:bg-dark-border transition-colors font-medium"
                >
                  Cancel
                </motion.button>
                <motion.button
                  onClick={handleSave}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={saving}
                  className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saving ? 'Saving...' : 'Save Plan'}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default PlanWeekModal
