const express = require('express');
const { getNotifications, markAsRead, markAllAsRead, deleteNotification } = require('../controllers/notificationController');
const { protect } = require('../middlewares/auth');

const router = express.Router();

// Get all notifications for the logged-in user
router.get('/', protect, getNotifications);

// Mark a specific notification as read
router.put('/:notificationId/read', protect, markAsRead);

// Mark all notifications as read
router.put('/mark-all-as-read', protect, markAllAsRead);

// Delete a notification
router.delete('/:notificationId', protect, deleteNotification);

module.exports = router;
