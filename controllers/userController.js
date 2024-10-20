const userService = require('../services/userService');

// Get a single user by ID
async function getUser(req, res) {
    try {
        const userId  =  req.user._id;
        const user = await userService.findUserById(userId);
        res.status(200).json({
            message: 'User found',
            data: user,
            status: true,
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            error: error.message,
        });
    }
}

// Get all users
async function usersList(req, res) {
    try {
        const users = await userService.allUsers();
        res.status(200).json({
            message: 'Users found',
            data: users,
            status: true,
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            error: error.message,
        });
    }
}

// Add a new user
async function addUser(req, res) {
    try {
        const newUser = await userService.addUser(req.body);
        res.status(201).json({
            message: 'User added successfully',
            data: newUser,
            status: true,
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            error: error.message,
        });
    }
}

// Update an existing user by ID
async function updateUser(req, res) {
    try {
        const id = req.body._id;
        const updatedUser = await userService.updateUserById(id, req.body);
        res.status(200).json({
            message: 'User updated successfully',
            data: updatedUser,
            status: true,
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            error: error.message,
        });
    }
}

// Delete a user by ID
async function deleteUser(req, res) {
    try {
        const id = req.body.id;
        await userService.deleteUserById(id);
        res.status(200).json({
            message: 'User deleted successfully',
            status: true,
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            error: error.message,
        });
    }
}

module.exports = {
    getUser,
    usersList,
    addUser,
    updateUser,
    deleteUser,
};
