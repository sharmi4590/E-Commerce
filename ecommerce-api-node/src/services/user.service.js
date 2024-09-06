const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwtProvider = require("../config/jwtProvider.js");

const createUser = async (userData) => {
  try {
    let { firstName, lastName, email, password } = userData;

    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      throw new Error(`User already exists with email: ${email}`);
    }

    // Hash the password
    password = await bcrypt.hash(password, 8);
    const user = await User.create({ firstName, lastName, email, password });
    console.log("Created user:", user);
    return user;
  } catch (error) {
    console.error("Error creating user:", error.message);
    throw new Error(error.message); // Changed to throw error.message directly
  }
};

const findUserById = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error(`User not found with id: ${userId}`);
    }
    return user;
  } catch (error) {
    console.error("Error finding user by ID:", error.message);
    throw new Error(error.message); // Changed to throw error.message directly
  }
};

const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error(`User not found with email: ${email}`);
    }
    return user;
  } catch (error) {
    console.error("Error finding user by email:", error.message);
    throw new Error(error.message); // Changed to throw error.message directly
  }
};

const getUserProfileByToken = async (token) => {
  try {
    const userId = jwtProvider.getUserIdFromToken(token);
    const user = await findUserById(userId);
    return user; // No need for an extra check here since findUserById throws an error if not found
  } catch (error) {
    console.error("Error retrieving user profile by token:", error.message);
    throw new Error(error.message); // Changed to throw error.message directly
  }
};

const getAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    console.error("Error retrieving all users:", error.message);
    throw new Error(error.message); // Changed to throw error.message directly
  }
};

module.exports = {
  createUser,
  findUserById,
  getUserByEmail,
  getUserProfileByToken,
  getAllUsers,
};
