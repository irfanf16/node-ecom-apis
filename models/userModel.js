const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/\S+@\S+\.\S+/, 'Invalid email format'], // Email format validation
    },
    password: {
        type: String,
        required: true,
    },
    profile_pic: {
        type: String,
        default: '', // Default to empty string if no profile picture is provided
    },
    phone: {
        type: String,
        default: '', // Default to empty string if no phone number is provided
    },
    role: {
        type: String,
        enum: ['user', 'admin'], // Limiting roles to 'user' and 'admin'
        default: 'user', // Default role is 'user'
    }
}, {
    timestamps: true // Adds createdAt and updatedAt fields automatically
});

const user = mongoose.model('user', userSchema);

module.exports = user;
