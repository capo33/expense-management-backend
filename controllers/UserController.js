import UserModel from "../models/User.js";
import bcrypt from "bcrypt";

import { generateToken } from "../utils/jwtMethods.js";

// @desc    Register new user
// @route   POST /api/users/register
// @access  Public
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Checl if user exists
    const userExists = await UserModel.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Generate salt & hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await UserModel.create({
      name,
      email,
      password: hashedPassword,
    });

    // Generate token
    const token = generateToken(newUser._id);

    res.status(200).json({
      success: true,
      message: "User created successfully",
      data: newUser,
      token,
    });
  } catch (err) {
    console.log(`Error: ${err.message}`);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// @desc    Login user
// @route   POST /api/users/login
// @access  Public
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (!existingUser)
      return res.status(404).json({ message: "Invalid credentials" });

    // Check if password is correct
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    // Create token
    const token = generateToken(existingUser?._id);

    // Remove password
    const { password: _, ...result } = existingUser._doc;

    // Send response
    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: result,
      token,
    });
  } catch (err) {
    console.log(`Error: ${err.message}`);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// @desc    Logout user
// @route   POST /api/users/logout
// @access  Private
const logout = async (req, res) => {};

export { register, login, logout };
