const express = require('express');
const { getNotifications, markAsRead, markAllAsRead, deleteNotification } = require('../controllers/notificationController');
const { auth } = require('../middlewares/auth');

const router = express.Router();

// Get all notifications for the logged-in user
router.get('/', auth, getNotifications);

// Mark a specific notification as read
router.put('/:notificationId/read', auth, markAsRead);

// Mark all notifications as read
router.put('/mark-all-as-read', auth, markAllAsRead);

// Delete a notification
router.delete('/:notificationId', auth, deleteNotification);

module.exports = router;
