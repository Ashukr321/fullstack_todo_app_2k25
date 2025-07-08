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
const getCurrentUser = async (req, res, next) => {
  try {
    const userId = req.userId;
    if (!userId) {
      const err = createError(400, "User ID is required!");
      return next(err);
    }

    const user = await User.findById(userId).select("-password");
    if (!user) {
      const err = createError(404, "User not found!")
      return next(err);
    }

    res.status(200).json({
      message: "User profile fetched successfully!",
      user: user
    });
  } catch (error) {
    next(error);
  }
};


// Update user profile
const updateUser = async (req, res, next) => {
  try {
    // Get name from request body
    const { name } = req.body;
    if (!name) {
      // Name is required
      // Name zaroori hai
      // Naam dalna zaroori hai
      const err = createError(400, "Please enter name / कृपया नाम दर्ज करें / Naam daalo");
      return next(err);
    }

    // Get userId from request (set by auth middleware)
    const userId = req.userId;
    if (!userId) {
      const err = createError(400, "User ID is required! / यूजर आईडी चाहिए / User ID chahiye");
      return next(err);
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { name: name },
      { new: true, select: '-password' }
    ).select('-password');

    if (!user) {
      const err = createError(404, "User not found!");
      return next(err);
    }
   
    res.status(200).json({
      message: "User updated successfully!",
      user: user
    });

  } catch (error) {
    next(error);
  }
};


// Change user password
const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword, confirmNewPassword } = req.body;

    // Check if all fields are provided
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      // Please provide all fields 
      const err = createError(400, "All fields are required");
      return next(err);
    }

    const userId = req.userId;
    const user = await User.findById(userId);

    if (!user) {
      const err = createError(404, "User not found");
      return next(err);
    }

    // Check if current password matches
    const matchPassword = await bcrypt.compare(currentPassword, user.password);

    if (!matchPassword) {
      // Current password is incorrect
      const err = createError(400, "Invalid current password");
      return next(err);
    }

    // Check if new passwords match
    if (newPassword !== confirmNewPassword) {
      // Passwords do not match 
      const err = createError(400, "Passwords do not match");
      return next(err);
    }

    // Hash new password and update
    const hashPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashPassword;
    // save user
    await user.save();

    res.status(200).json({
      message: "Password changed successfully!"
    });

  } catch (error) {
    next(error);
  }
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


