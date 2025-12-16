const Recipe = require('../models/Recipe');
const User = require('../models/User');
const { createNotification } = require('./notificationController');

exports.getAllRecipes = async (req, res) => {
  try {
    const { search, tags, cuisine, season, mood, sort } = req.query;
    const query = {};

    if (search) {
      query.$text = { $search: search };
    }

    if (tags) {
      query.tags = { $in: tags.split(',') };
    }

    if (cuisine) {
      query.tags = { $in: [cuisine] };
    }

    if (season) {
      query.season = season;
    }

    if (mood) {
      query.mood = { $in: mood.split(',') };
    }

    let sortOption = {};
    if (sort === 'rating') {
      sortOption = { rating: -1 };
    } else if (sort === 'time') {
      sortOption = { time: 1 };
    } else {
      sortOption = { createdAt: -1 };
    }

    const recipes = await Recipe.find(query)
      .select('title chef image time servings rating reviewsCount tags season mood difficulty cuisine')
      .sort(sortOption)
      .lean();

    res.status(200).json({
      success: true,
      count: recipes.length,
      recipes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

exports.getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: 'Recipe not found'
      });
    }

    res.status(200).json({
      success: true,
      recipe
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

exports.createRecipe = async (req, res) => {
  try {
    const {
      title,
      image,
      time,
      servings,
      ingredients,
      instructions,
      nutrition,
      tags,
      season,
      mood,
      difficulty,
      cuisine
    } = req.body;

    const recipe = await Recipe.create({
      title,
      chef: req.user.name,
      userId: req.user.id,
      image,
      time,
      servings,
      ingredients,
      instructions,
      nutrition,
      tags,
      season,
      mood,
      difficulty,
      cuisine
    });

    await User.findByIdAndUpdate(req.user.id, {
      $push: { createdRecipes: recipe._id }
    });

    res.status(201).json({
      success: true,
      recipe
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

exports.updateRecipe = async (req, res) => {
  try {
    let recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: 'Recipe not found'
      });
    }

    if (recipe.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this recipe'
      });
    }

    recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      recipe
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

exports.deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: 'Recipe not found'
      });
    }

    if (recipe.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this recipe'
      });
    }

    await Recipe.findByIdAndDelete(req.params.id);

    await User.findByIdAndUpdate(req.user.id, {
      $pull: { createdRecipes: req.params.id }
    });

    res.status(200).json({
      success: true,
      message: 'Recipe deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

exports.addReview = async (req, res) => {
  try {
    const { text } = req.body;
    const recipe = await Recipe.findById(req.params.id).populate('userId');

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: 'Recipe not found'
      });
    }

    const review = {
      author: req.user.name,
      text,
      userId: req.user.id,
      when: 'Just now'
    };

    recipe.reviews.push(review);
    recipe.reviewsCount = recipe.reviews.length;

    await recipe.save();

    // Create notification for the recipe owner
    if (recipe.userId._id.toString() !== req.user.id) {
      await createNotification(
        recipe.userId._id,
        'comment',
        `${req.user.name} commented on your recipe`,
        {
          sender: req.user.id,
          relatedRecipe: recipe._id,
          action: 'commented on',
          comment: text
        }
      );
    }

    res.status(201).json({
      success: true,
      recipe
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

exports.getRandomRecipe = async (req, res) => {
  try {
    const count = await Recipe.countDocuments();
    const random = Math.floor(Math.random() * count);
    const recipe = await Recipe.findOne().skip(random);

    res.status(200).json({
      success: true,
      recipe
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};
