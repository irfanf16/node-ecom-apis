const express = require('express');
const router = express.Router();

const registerUser = require('../controllers/registerController');
const  loginUser  = require('../controllers/loginController');
const  logoutUser = require('../controllers/logoutController');
const  authToken  = require('../middlewares/authToken');
const  userController = require('../controllers/userController');

// Register a new user
router.post('/register', registerUser);

// Login user
router.post('/login', loginUser);
router.get('/logout', logoutUser);

// Get user data (protected route)
router.get('/user', authToken, userController.getUser);
router.put('/user', authToken, userController.updateUser);
router.delete('/user', authToken, userController.deleteUser);
router.get('/users', userController.usersList);

module.exports = router;
