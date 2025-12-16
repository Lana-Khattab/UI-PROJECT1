const express = require('express');
const { body } = require('express-validator');
const { register, login, getMe, updateProfile, uploadAvatar } = require('../controllers/authController');
const auth = require('../middlewares/auth');
const upload = require('../middlewares/upload');

const router = express.Router();

router.post(
  '/register',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
  ],
  register
);

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required')
  ],
  login
);

router.get('/me', auth.protect, getMe);

router.put('/profile', auth.protect, updateProfile);

router.post('/upload-avatar', auth.protect, upload.single('avatar'), uploadAvatar);

module.exports = router;
