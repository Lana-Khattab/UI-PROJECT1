const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    type: {
      type: String,
      enum: ['like', 'comment', 'follow', 'milestone', 'order', 'recipe'],
      required: true
    },
    title: {
      type: String,
      required: true
    },
    message: {
      type: String
    },
    relatedRecipe: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Recipe'
    },
    relatedOrder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order'
    },
    read: {
      type: Boolean,
      default: false
    },
    action: {
      type: String,
      default: ''
    },
    comment: {
      type: String
    }
  },
  { timestamps: true }
);

// Index for finding unread notifications
notificationSchema.index({ recipient: 1, read: 1 });

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
