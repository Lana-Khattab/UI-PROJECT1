const mongoose = require('mongoose');
const Recipe = require('../models/Recipe');
const recipesData = require('../../src/data/recipes.json');

const seedRecipes = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/foodies');
    console.log('Connected to MongoDB');

    let addedCount = 0;
    let skippedCount = 0;

    for (const recipeData of recipesData) {
      const existingRecipe = await Recipe.findOne({ title: recipeData.title });
      
      if (existingRecipe) {
        console.log(`Skipping duplicate: ${recipeData.title}`);
        skippedCount++;
        continue;
      }

      const recipe = {
        title: recipeData.title,
        chef: recipeData.chef,
        image: recipeData.image,
        time: recipeData.time,
        servings: recipeData.servings,
        rating: recipeData.rating,
        reviewsCount: recipeData.reviewsCount,
        reviews: recipeData.reviews || [],
        ingredients: recipeData.ingredients,
        instructions: recipeData.instructions,
        nutrition: recipeData.nutrition,
        tags: recipeData.tags,
        season: recipeData.season,
        mood: recipeData.mood,
        difficulty: recipeData.difficulty,
        cuisine: recipeData.cuisine
      };

      await Recipe.create(recipe);
      console.log(`Added: ${recipeData.title}`);
      addedCount++;
    }

    console.log(`\nSeeding complete: ${addedCount} recipes added, ${skippedCount} duplicates skipped`);

    await mongoose.connection.close();
    console.log('Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding recipes:', error);
    process.exit(1);
  }
};

seedRecipes();
