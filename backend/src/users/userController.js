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
// English, Hindi, Hinglish comments and corrections applied

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if email is provided
    if (!email) {
      
      const err = createError(400, "Email field is required! (Email field zaroori hai)");
      return next(err);
    }

    // Check if password is provided
    if (!password) {
      
      const err = createError(400, "Password field is required! (Password field zaroori hai)");
      return next(err);
    }

    // Find user by email
    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
   
      const err = createError(400, "User does not exist! (User exist nahi karta)");
      return next(err);
    }

    // Verify password
    // Password check karo
    const matchPassword = await bcrypt.compare(password, existingUser.password);
    if (!matchPassword) {
      const err = createError(401, "Invalid password! (Galat password)");
      return next(err);
    }

    // Create JWT token
    // Token banao user ki id aur secret key se
    const token = jwt.sign(
      { userId: existingUser._id },
      envConfig.jwt_secret,
      { expiresIn: envConfig.expire_jwt_token }
    );

    // Login successful

    res.json({
      message: "Login successfull!",
      user: {
        _id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email
      },
      token: token
    });
  } catch (error) {
    
    next(error);
  }
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


