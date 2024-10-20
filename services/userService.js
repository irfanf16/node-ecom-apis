// userService.js
const User = require("../models/userModel");

// Fetch a user by ID
async function findUserById(id) {
    return await User.findById(id);
}

// Fetch all users
async function allUsers() {
    return await User.find();
}

// Add a new user
async function addUser(userData) {
    const newUser = new User(userData);
    return await newUser.save();
}

// Update an existing user by ID
async function updateUserById(id, updateData) {
    return await User.findByIdAndUpdate(id, updateData, { new: true });
}

// Delete a user by ID
async function deleteUserById(id) {
    return await User.findByIdAndDelete(id);
}

module.exports = {
    findUserById,
    allUsers,
    addUser,
    updateUserById,
    deleteUserById,
};
