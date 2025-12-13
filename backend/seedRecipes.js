const mongoose = require('mongoose');
const Recipe = require('./models/Recipe');
const User = require('./models/User');
require('dotenv').config();

const recipes = require('../src/data/recipes.json');

const seedRecipes = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');

    // Clear existing recipes
    await Recipe.deleteMany({});
    console.log('Cleared existing recipes');

    // Default reviews for recipes without any
    const defaultReviews = [
      { author: 'Sarah M.', text: 'This recipe is amazing! Made it for my family and everyone loved it.', when: '1 week ago' },
      { author: 'Mike Johnson', text: 'Easy to follow and delicious results. Highly recommend!', when: '3 days ago' },
      { author: 'Emily Chen', text: 'Perfect! Will definitely make this again.', when: '5 days ago' }
    ];

    // Create a map to store chef users
    const chefUsers = new Map();

    // Process each recipe
    for (const recipe of recipes) {
      const chefName = recipe.chef || 'Chef Admin';
      
      // Check if we already have this chef user in memory
      let chefUser = chefUsers.get(chefName);
      
      if (!chefUser) {
        // Check if chef exists in database
        const email = chefName.toLowerCase().replace(/\s+/g, '') + '@foodies.com';
        chefUser = await User.findOne({ email });
        
        if (!chefUser) {
          // Create new chef user
          chefUser = await User.create({
            name: chefName,
            email: email,
            password: 'password123'
          });
          console.log(`Created user for chef: ${chefName}`);
        }
        
        chefUsers.set(chefName, chefUser);
      }

      // Transform reviews to include userId, or use default reviews if none exist
      let transformedReviews;
      if (recipe.reviews && recipe.reviews.length > 0) {
        transformedReviews = recipe.reviews.map(review => ({
          author: review.author,
          text: review.text,
          when: review.when || 'Just now',
          userId: chefUser._id
        }));
      } else {
        // Add default reviews for recipes without any
        transformedReviews = defaultReviews.map(review => ({
          author: review.author,
          text: review.text,
          when: review.when,
          userId: chefUser._id
        }));
      }

      // Create recipe
      const newRecipe = await Recipe.create({
        title: recipe.title,
        chef: chefName,
        userId: chefUser._id,
        image: recipe.image,
        time: recipe.time,
        servings: recipe.servings || 4,
        rating: recipe.rating || 0,
        reviewsCount: transformedReviews.length,
        reviews: transformedReviews,
        ingredients: recipe.ingredients || [],
        instructions: recipe.instructions || [],
        nutrition: recipe.nutrition || {
          calories: 0,
          protein: '0g',
          carbs: '0g',
          fat: '0g'
        },
        tags: recipe.tags || [],
        season: recipe.season || 'All Seasons',
        mood: recipe.mood || [],
        difficulty: recipe.difficulty ? recipe.difficulty.toLowerCase() : 'medium',
        cuisine: recipe.cuisine || 'International'
      });

      // Update chef's createdRecipes
      await User.findByIdAndUpdate(chefUser._id, {
        $push: { createdRecipes: newRecipe._id }
      });
    }

    console.log(`✅ Successfully inserted ${recipes.length} recipes into the database`);
    console.log(`✅ Created ${chefUsers.size} chef users`);
    console.log('✅ Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding recipes:', error);
    process.exit(1);
  }
};

seedRecipes();
