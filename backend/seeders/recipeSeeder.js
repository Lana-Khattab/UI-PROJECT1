const mongoose = require('mongoose');
const Recipe = require('../models/Recipe');
const Product = require('../models/Product');
const recipesData = require('../../src/data/recipes.json');
const productsData = require('../../src/data/products.json');

const seedRecipes = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/foodies');
    console.log('Connected to MongoDB');

    let recipesAddedCount = 0;
    let recipesSkippedCount = 0;
    let productsAddedCount = 0;
    let productsSkippedCount = 0;

    console.log('\n=== Seeding Recipes ===');
    for (const recipeData of recipesData) {
      const existingRecipe = await Recipe.findOne({ title: recipeData.title });
      
      if (existingRecipe) {
        console.log(`Skipping duplicate recipe: ${recipeData.title}`);
        recipesSkippedCount++;
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
      console.log(`Added recipe: ${recipeData.title}`);
      recipesAddedCount++;
    }

    console.log('\n=== Seeding Products ===');
    for (const productData of productsData) {
      const existingProduct = await Product.findOne({ name: productData.name });
      
      if (existingProduct) {
        console.log(`Skipping duplicate product: ${productData.name}`);
        productsSkippedCount++;
        continue;
      }

      const product = {
        name: productData.name,
        category: productData.category,
        price: productData.price,
        description: productData.description,
        image: productData.image,
        stock: productData.stock || 100
      };

      await Product.create(product);
      console.log(`Added product: ${productData.name}`);
      productsAddedCount++;
    }

    console.log('\n=== Seeding Summary ===');
    console.log(`Recipes: ${recipesAddedCount} added, ${recipesSkippedCount} duplicates skipped`);
    console.log(`Products: ${productsAddedCount} added, ${productsSkippedCount} duplicates skipped`);

    await mongoose.connection.close();
    console.log('\nDatabase connection closed');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedRecipes();
