const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function login(req, res) {
    try {
        // Destructure the email and password from request body
        const { email, password } = req.body;

        // Validate input fields
        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }
        if (!password) {
            return res.status(400).json({ message: "Password is required" });
        }

        // Fetch user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare the provided password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Generate JWT token
        const tokenPayload = {
            _id: user._id,
            email: user.email
        };
        const token = jwt.sign(tokenPayload, process.env.TOKEN_SECRET_KEY, { expiresIn: '9h' });

        // Set cookie options
        const tokenOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Set secure cookie in production
            sameSite: 'Strict', // Helps protect against CSRF attacks
        };

        // Respond with success status, user data, and token
        return res
            .status(200)
            .cookie('token', token, tokenOptions)
            .json({
                status: true,
                message: 'Login successful',
                user: user,
                token,
            });
    } catch (error) {
        console.log("Login Error: ", error); // Log the error for debugging
        return res.status(500).json({
            status: false,
            error: 'Internal Server Error. Please try again later.',
        });
    }
}

module.exports = login;
