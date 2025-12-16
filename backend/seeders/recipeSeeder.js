const mongoose = require('mongoose');
const Recipe = require('../models/Recipe');
const recipesData = require('../../src/data/recipes.json');

const seedRecipes = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/foodies');
    console.log('Connected to MongoDB');

    await Recipe.deleteMany({});
    console.log('Cleared existing recipes');

    const recipes = recipesData.map(recipe => ({
      title: recipe.title,
      chef: recipe.chef,
      image: recipe.image,
      time: recipe.time,
      servings: recipe.servings,
      rating: recipe.rating,
      reviewsCount: recipe.reviewsCount,
      reviews: recipe.reviews || [],
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
      nutrition: recipe.nutrition,
      tags: recipe.tags,
      season: recipe.season,
      mood: recipe.mood
    }));

    const insertedRecipes = await Recipe.insertMany(recipes);
    console.log(`Successfully seeded ${insertedRecipes.length} recipes`);

    await mongoose.connection.close();
    console.log('Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding recipes:', error);
    process.exit(1);
  }
};

seedRecipes();
