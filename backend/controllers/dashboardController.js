const Recipe = require('../models/Recipe');
const User = require('../models/User');
const Order = require('../models/Order');

exports.getDashboardStats = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('favorites');
    
    const allRecipes = await Recipe.find();
    const userOrders = await Order.find({ userId: req.user.id });
    
    const totalTime = allRecipes.reduce((sum, recipe) => {
      const time = parseInt(recipe.time) || 0;
      return sum + time;
    }, 0);

    const avgTime = allRecipes.length > 0 ? Math.round(totalTime / allRecipes.length) : 0;

    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const weeklyMeals = await Recipe.countDocuments({
      createdAt: { $gte: oneWeekAgo }
    });

    res.status(200).json({
      success: true,
      stats: {
        totalRecipes: allRecipes.length,
        favorites: user.favorites.length,
        avgTime: avgTime,
        weeklyMeals: weeklyMeals,
        totalOrders: userOrders.length
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

exports.getRecipeTypeStats = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    
    const typeCount = {
      Breakfast: 0,
      Lunch: 0,
      Dinner: 0,
      Snacks: 0,
      Desserts: 0,
      Appetizers: 0
    };

    recipes.forEach(recipe => {
      if (recipe.tags && Array.isArray(recipe.tags)) {
        recipe.tags.forEach(tag => {
          const normalizedTag = tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase();
          if (typeCount.hasOwnProperty(normalizedTag)) {
            typeCount[normalizedTag]++;
          }
        });
      }
    });

    res.status(200).json({
      success: true,
      recipeTypes: typeCount
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

exports.getFavoritesByCategory = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('favorites');
    
    const categoryCount = {
      Desserts: 0,
      Mains: 0,
      Sides: 0,
      Appetizers: 0,
      Salads: 0,
      Breakfast: 0,
      Lunch: 0,
      Dinner: 0
    };

    user.favorites.forEach(recipe => {
      if (recipe.tags && Array.isArray(recipe.tags)) {
        recipe.tags.forEach(tag => {
          const normalizedTag = tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase();
          if (categoryCount.hasOwnProperty(normalizedTag)) {
            categoryCount[normalizedTag]++;
          }
        });
      }
    });

    res.status(200).json({
      success: true,
      favoritesByCategory: categoryCount
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

exports.getRecentActivity = async (req, res) => {
  try {
    const recentRecipes = await Recipe.find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .limit(10);

    const user = await User.findById(req.user.id).populate('favorites');
    
    const activities = [];

    recentRecipes.forEach(recipe => {
      activities.push({
        type: 'created',
        action: 'Created recipe',
        detail: recipe.title,
        timestamp: recipe.createdAt
      });
    });

    user.favorites.slice(0, 5).forEach(recipe => {
      if (recipe.createdAt) {
        activities.push({
          type: 'favorite',
          action: 'Added favorite',
          detail: recipe.title,
          timestamp: recipe.createdAt
        });
      }
    });

    activities.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    const formattedActivities = activities.slice(0, 10).map(activity => {
      const daysAgo = Math.floor((new Date() - new Date(activity.timestamp)) / (1000 * 60 * 60 * 24));
      let timeString;
      
      if (daysAgo === 0) {
        timeString = 'Today';
      } else if (daysAgo === 1) {
        timeString = '1 day ago';
      } else if (daysAgo < 7) {
        timeString = `${daysAgo} days ago`;
      } else if (daysAgo < 30) {
        const weeks = Math.floor(daysAgo / 7);
        timeString = weeks === 1 ? '1 week ago' : `${weeks} weeks ago`;
      } else {
        const months = Math.floor(daysAgo / 30);
        timeString = months === 1 ? '1 month ago' : `${months} months ago`;
      }

      return {
        action: activity.action,
        detail: `${activity.detail} • ${timeString}`
      };
    });

    res.status(200).json({
      success: true,
      activities: formattedActivities
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

exports.getWeeklyMealPlan = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (user.mealPlans && user.mealPlans.length > 0) {
      const latestPlan = user.mealPlans[user.mealPlans.length - 1];
      return res.status(200).json({
        success: true,
        mealPlan: latestPlan.plan
      });
    }

    const recipes = await Recipe.find().limit(21);
    
    const mealPlan = {
      Monday: { breakfast: null, lunch: null, dinner: null },
      Tuesday: { breakfast: null, lunch: null, dinner: null },
      Wednesday: { breakfast: null, lunch: null, dinner: null },
      Thursday: { breakfast: null, lunch: null, dinner: null },
      Friday: { breakfast: null, lunch: null, dinner: null },
      Saturday: { breakfast: null, lunch: null, dinner: null },
      Sunday: { breakfast: null, lunch: null, dinner: null }
    };

    const days = Object.keys(mealPlan);
    const mealTypes = ['breakfast', 'lunch', 'dinner'];
    let recipeIndex = 0;

    for (let day of days) {
      for (let meal of mealTypes) {
        if (recipeIndex < recipes.length) {
          mealPlan[day][meal] = {
            id: recipes[recipeIndex]._id,
            title: recipes[recipeIndex].title,
            time: recipes[recipeIndex].time,
            image: recipes[recipeIndex].image
          };
          recipeIndex++;
        }
      }
    }

    res.status(200).json({
      success: true,
      mealPlan
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

exports.getAllMealPlans = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    const mealPlans = user.mealPlans || [];

    res.status(200).json({
      success: true,
      mealPlans: mealPlans
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

exports.saveMealPlan = async (req, res) => {
  try {
    const { mealPlan, weekStartDate } = req.body;

    if (!mealPlan) {
      return res.status(400).json({
        success: false,
        message: 'Meal plan is required'
      });
    }

    const user = await User.findById(req.user.id);
    
    if (!user.mealPlans) {
      user.mealPlans = [];
    }

    const planDate = weekStartDate ? new Date(weekStartDate) : new Date();

    const existingPlanIndex = user.mealPlans.findIndex(plan => {
      const planStartDate = new Date(plan.weekStartDate);
      return Math.abs(planStartDate - planDate) < 24 * 60 * 60 * 1000;
    });

    if (existingPlanIndex !== -1) {
      user.mealPlans[existingPlanIndex].plan = mealPlan;
      user.mealPlans[existingPlanIndex].createdAt = new Date();
    } else {
      user.mealPlans.push({
        weekStartDate: planDate,
        plan: mealPlan,
        createdAt: new Date()
      });
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Meal plan saved successfully',
      mealPlan: mealPlan
    });
  } catch (error) {
    console.error('Save meal plan error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};
