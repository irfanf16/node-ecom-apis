const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const connectDB = require('./config/database');
const router = require('./routes');

const app = express();

// Enable CORS with credentials for frontend URL
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

// Middleware to parse JSON and cookies
app.use(express.json());
app.use(cookieParser());

// Main API routes
app.use('/api', router);

// Use environment variable PORT or default to 5000
const PORT = process.env.PORT || 5000;

// Connect to the database and start the server
connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log('Database connected successfully');
            console.log(`App is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Database connection failed:', error.message);
        process.exit(1);  // Exit the process if DB connection fails
    });
