const Collection = require('../models/Collection');
const Recipe = require('../models/Recipe');

// Get all collections for the current user
exports.getMyCollections = async (req, res) => {
  try {
    const collections = await Collection.find({ userId: req.user.id })
      .populate('recipes', 'title image chef time rating')
      .sort({ updatedAt: -1 });
    
    res.json({ success: true, collections });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a single collection by ID
exports.getCollection = async (req, res) => {
  try {
    const collection = await Collection.findById(req.params.id)
      .populate('recipes');
    
    if (!collection) {
      return res.status(404).json({ success: false, message: 'Collection not found' });
    }
    
    // Check if collection is public or belongs to the user
    if (!collection.isPublic && collection.userId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }
    
    res.json({ success: true, collection });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create a new collection
exports.createCollection = async (req, res) => {
  try {
    const { name, description, isPublic, coverImage, tags } = req.body;
    
    const collection = new Collection({
      name,
      description,
      userId: req.user.id,
      isPublic: isPublic || false,
      coverImage,
      tags,
      recipes: []
    });
    
    await collection.save();
    res.status(201).json({ success: true, collection });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update a collection
exports.updateCollection = async (req, res) => {
  try {
    const { name, description, isPublic, coverImage, tags } = req.body;
    
    const collection = await Collection.findById(req.params.id);
    
    if (!collection) {
      return res.status(404).json({ success: false, message: 'Collection not found' });
    }
    
    // Check if user owns this collection
    if (collection.userId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }
    
    collection.name = name || collection.name;
    collection.description = description || collection.description;
    collection.isPublic = isPublic !== undefined ? isPublic : collection.isPublic;
    collection.coverImage = coverImage || collection.coverImage;
    collection.tags = tags || collection.tags;
    
    await collection.save();
    res.json({ success: true, collection });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Add a recipe to collection
exports.addRecipeToCollection = async (req, res) => {
  try {
    const { recipeId } = req.body;
    const collectionId = req.params.id;
    
    // Check if recipe exists
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({ success: false, message: 'Recipe not found' });
    }
    
    const collection = await Collection.findById(collectionId);
    
    if (!collection) {
      return res.status(404).json({ success: false, message: 'Collection not found' });
    }
    
    // Check if user owns this collection
    if (collection.userId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }
    
    // Check if recipe is already in collection
    if (collection.recipes.includes(recipeId)) {
      return res.status(400).json({ success: false, message: 'Recipe already in collection' });
    }
    
    collection.recipes.push(recipeId);
    await collection.save();
    
    res.json({ success: true, collection });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Remove a recipe from collection
exports.removeRecipeFromCollection = async (req, res) => {
  try {
    const { recipeId } = req.body;
    const collectionId = req.params.id;
    
    const collection = await Collection.findById(collectionId);
    
    if (!collection) {
      return res.status(404).json({ success: false, message: 'Collection not found' });
    }
    
    // Check if user owns this collection
    if (collection.userId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }
    
    // Remove the recipe from the collection
    collection.recipes = collection.recipes.filter(
      id => id.toString() !== recipeId
    );
    
    await collection.save();
    res.json({ success: true, collection });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a collection
exports.deleteCollection = async (req, res) => {
  try {
    const collection = await Collection.findById(req.params.id);
    
    if (!collection) {
      return res.status(404).json({ success: false, message: 'Collection not found' });
    }
    
    // Check if user owns this collection
    if (collection.userId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }
    
    await collection.deleteOne();
    res.json({ success: true, message: 'Collection deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get public collections (for browsing)
exports.getPublicCollections = async (req, res) => {
  try {
    const collections = await Collection.find({ isPublic: true })
      .populate('userId', 'name')
      .populate('recipes', 'title image chef rating')
      .sort({ createdAt: -1 })
      .limit(20);
    
    res.json({ success: true, collections });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};