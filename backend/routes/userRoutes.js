const express = require('express');
const {
  addToFavorites,
  removeFromFavorites,
  getFavorites,
  createCollection,
  getCollections,
  getCollectionById,
  addRecipeToCollection,
  removeRecipeFromCollection,
  deleteCollection
} = require('../controllers/userController');
const { protect } = require('../middlewares/auth');

const router = express.Router();

router.get('/favorites', protect, getFavorites);
router.post('/favorites', protect, addToFavorites);
router.delete('/favorites/:recipeId', protect, removeFromFavorites);

router.get('/collections', protect, getCollections);
router.post('/collections', protect, createCollection);
router.get('/collections/:id', protect, getCollectionById);
router.delete('/collections/:id', protect, deleteCollection);

router.post('/collections/recipes', protect, addRecipeToCollection);
router.delete('/collections/:collectionId/recipes/:recipeId', protect, removeRecipeFromCollection);

module.exports = router;
