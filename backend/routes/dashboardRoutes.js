const express = require('express');
const {
  getDashboardStats,
  getRecipeTypeStats,
  getFavoritesByCategory,
  getRecentActivity,
  getWeeklyMealPlan,
  getAllMealPlans,
  saveMealPlan
} = require('../controllers/dashboardController');
const { protect } = require('../middlewares/auth');

const router = express.Router();

router.get('/stats', protect, getDashboardStats);
router.get('/recipe-types', protect, getRecipeTypeStats);
router.get('/favorites-by-category', protect, getFavoritesByCategory);
router.get('/recent-activity', protect, getRecentActivity);
router.get('/meal-plan', protect, getWeeklyMealPlan);
router.get('/meal-plans', protect, getAllMealPlans);
router.post('/meal-plan', protect, saveMealPlan);

module.exports = router;
