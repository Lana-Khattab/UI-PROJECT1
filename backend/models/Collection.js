const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Collection name is required'],
    trim: true
  },
  description: {
    type: String,
    default: ''
  },
  // Array of recipe IDs that belong to this collection
  recipes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recipe'
  }],
  // Who created this collection
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // Is this collection public or private?
  isPublic: {
    type: Boolean,
    default: false
  },
  // Cover image for the collection
  coverImage: {
    type: String,
    default: ''
  },
  tags: [{
    type: String
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Collection', collectionSchema);