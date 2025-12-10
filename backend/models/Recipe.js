const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  when: {
    type: String,
    default: 'Just now'
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  chef: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  image: {
    type: String,
    required: [true, 'Image is required']
  },
  time: {
    type: Number,
    required: true
  },
  servings: {
    type: Number,
    required: true,
    default: 4
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviewsCount: {
    type: Number,
    default: 0
  },
  reviews: [reviewSchema],
  ingredients: [{
    type: String,
    required: true
  }],
  instructions: [{
    type: String,
    required: true
  }],
  nutrition: {
    calories: {
      type: Number,
      required: true
    },
    protein: {
      type: String,
      required: true
    },
    carbs: {
      type: String,
      required: true
    },
    fat: {
      type: String,
      required: true
    }
  },
  tags: [{
    type: String
  }],
  season: {
    type: String,
    enum: ['Spring', 'Summer', 'Fall', 'Winter', 'All Seasons'],
    default: 'All Seasons'
  },
  mood: [{
    type: String
  }],
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'medium'
  },
  cuisine: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

recipeSchema.index({ title: 'text', tags: 'text' });

module.exports = mongoose.model('Recipe', recipeSchema);
