const User = require('../models/User');
const Recipe = require('../models/Recipe');

exports.addToFavorites = async (req, res) => {
  try {
    const { recipeId } = req.body;

    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: 'Recipe not found'
      });
    }

    const user = await User.findById(req.user.id);

    if (user.favorites.includes(recipeId)) {
      return res.status(400).json({
        success: false,
        message: 'Recipe already in favorites'
      });
    }

    user.favorites.push(recipeId);
    await user.save();

    res.status(200).json({
      success: true,
      favorites: user.favorites
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

exports.removeFromFavorites = async (req, res) => {
  try {
    const { recipeId } = req.params;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $pull: { favorites: recipeId } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      favorites: user.favorites
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

exports.getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('favorites');

    res.status(200).json({
      success: true,
      favorites: user.favorites
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

exports.createCollection = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Collection name is required'
      });
    }

    const user = await User.findById(req.user.id);

    user.collections.push({ name, recipes: [] });
    await user.save();

    res.status(201).json({
      success: true,
      collections: user.collections
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

exports.getCollections = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('collections.recipes');

    res.status(200).json({
      success: true,
      collections: user.collections
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

exports.getCollectionById = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('collections.recipes');
    const collection = user.collections.id(req.params.id);

    if (!collection) {
      return res.status(404).json({
        success: false,
        message: 'Collection not found'
      });
    }

    res.status(200).json({
      success: true,
      collection
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

exports.addRecipeToCollection = async (req, res) => {
  try {
    const { collectionId, recipeId } = req.body;

    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: 'Recipe not found'
      });
    }

    const user = await User.findById(req.user.id);
    const collection = user.collections.id(collectionId);

    if (!collection) {
      return res.status(404).json({
        success: false,
        message: 'Collection not found'
      });
    }

    if (collection.recipes.includes(recipeId)) {
      return res.status(400).json({
        success: false,
        message: 'Recipe already in collection'
      });
    }

    collection.recipes.push(recipeId);
    await user.save();

    res.status(200).json({
      success: true,
      collection
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

exports.removeRecipeFromCollection = async (req, res) => {
  try {
    const { collectionId, recipeId } = req.params;

    const user = await User.findById(req.user.id);
    const collection = user.collections.id(collectionId);

    if (!collection) {
      return res.status(404).json({
        success: false,
        message: 'Collection not found'
      });
    }

    collection.recipes = collection.recipes.filter(
      id => id.toString() !== recipeId
    );

    await user.save();

    res.status(200).json({
      success: true,
      collection
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

exports.deleteCollection = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const collection = user.collections.id(req.params.id);

    if (!collection) {
      return res.status(404).json({
        success: false,
        message: 'Collection not found'
      });
    }

    collection.remove();
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Collection deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};
