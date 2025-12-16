const express = require('express');
const {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  addReview,
  getRandomRecipe,
  uploadRecipeImage
} = require('../controllers/recipeController');
const { protect, optionalAuth } = require('../middlewares/auth');
const upload = require('../middlewares/recipeUpload');

const router = express.Router();

router.get('/', optionalAuth, getAllRecipes);

router.get('/random', getRandomRecipe);

router.get('/:id', getRecipeById);

router.post('/', protect, createRecipe);

router.post('/upload-image', protect, upload.single('image'), uploadRecipeImage);

router.put('/:id', protect, updateRecipe);

router.delete('/:id', protect, deleteRecipe);

router.post('/:id/reviews', protect, addReview);

module.exports = router;
