const express = require('express');
const {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  addReview,
  getRandomRecipe
} = require('../controllers/recipeController');
const { protect, optionalAuth } = require('../middlewares/auth');

const router = express.Router();

router.get('/', optionalAuth, getAllRecipes);

router.get('/random', getRandomRecipe);

router.get('/:id', getRecipeById);

router.post('/', protect, createRecipe);

router.put('/:id', protect, updateRecipe);

router.delete('/:id', protect, deleteRecipe);

router.post('/:id/reviews', protect, addReview);

module.exports = router;
