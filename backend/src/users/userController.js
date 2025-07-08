import User from './userModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import envConfig from '../config/envConfig.js';
import createError from 'http-errors'

// Register a new user
const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Check if all required fields are provided
    if (!name || !email || !password) {
     
      const err = createError(400, "Please provide all required fields!");
      return next(err);
    }

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      const err = createError(401, "User already exists");
      return next(err);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = new User({
      name: name,
      email: email,
      password: hashedPassword
    });
    await newUser.save();
    res.status(200).json({
      message: "User registered successfully!"
    });
  } catch (error) {
    next(error); //  forward error to global error handler
  }
};



// User login
const loginUser = (req, res) => {
  res.json({ message: "User login route" });
};

// Get current user profile
const getCurrentUser = (req, res) => {
  res.json({ message: "Get current user profile route" });
};

// Update user profile
const updateUser = (req, res) => {
  res.json({ message: "Update user profile route" });
};

// Change user password
const changePassword = (req, res) => {
  res.json({ message: "Change password route" });
};

// Delete user account
const deleteUser = (req, res) => {
  res.json({ message: "Delete user account route" });
};

// Exporting all controllers at the end as per instructions
export {
  registerUser,
  loginUser,
  getCurrentUser,
  updateUser,
  changePassword,
  deleteUser
};


