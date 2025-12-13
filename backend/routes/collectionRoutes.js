const express = require('express');
const router = express.Router();
const collectionController = require('../controllers/collectionController');
const auth = require('../middlewares/auth');

// All routes require authentication
router.use(auth);

// User's collections
router.get('/my-collections', collectionController.getMyCollections);
router.post('/', collectionController.createCollection);
router.get('/:id', collectionController.getCollection);
router.put('/:id', collectionController.updateCollection);
router.delete('/:id', collectionController.deleteCollection);

// Recipe management in collections
router.post('/:id/add-recipe', collectionController.addRecipeToCollection);
router.post('/:id/remove-recipe', collectionController.removeRecipeFromCollection);

// Public collections (no auth required)
router.get('/public/all', collectionController.getPublicCollections);

module.exports = router;

