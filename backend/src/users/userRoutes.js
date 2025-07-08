import express from 'express'
import {
  registerUser,
  loginUser,
  getCurrentUser,
  updateUser,
  changePassword,
  deleteUser
} from './userController.js';

const router = express.Router();

// All user routes created as per instructions

// Register a new user
router.post('/auth/register', registerUser);

// User login
router.post('/auth/login', loginUser);

// Get current user profile
router.get('/auth/me', getCurrentUser);

// Update user profile
router.put('/auth/update', updateUser);

// Change user password
router.put('/auth/change-password', changePassword);

// Delete user account
router.delete('/auth/delete', deleteUser);

export default router;
