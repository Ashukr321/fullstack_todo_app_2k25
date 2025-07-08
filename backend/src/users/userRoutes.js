import express from 'express'
import {
  registerUser,
  loginUser,
  getCurrentUser,
  updateUser,
  changePassword,
  deleteUser
} from './userController.js';
import isAuthenticated from '../middleware/isAuthenticated.js';

const router = express.Router();

// All user routes created as per instructions

// Register a new user
router.post('/auth/register', registerUser);

// User login
router.post('/auth/login', loginUser);

// Get current user profile
router.get('/auth/me', isAuthenticated, getCurrentUser);

// Update user profile
router.put('/auth/update', isAuthenticated, updateUser);

// Change user password
router.put('/auth/change-password', isAuthenticated, changePassword);

// Delete user account
router.delete('/auth/delete', isAuthenticated, deleteUser);

export default router;
