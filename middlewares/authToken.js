const jwt = require('jsonwebtoken');

async function authToken(req, res, next) {
    try {
        // Get token from cookies or header
        const token = req.cookies?.token || req.header('x-auth-token');
        
        if (!token) {
            return res.status(401).json({ message: 'Access Denied. No token provided.' });
        }

        // Verify the token
        jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
            if (err) {
                console.error('JWT Verification Error:', err.message);
                return res.status(401).json({ message: 'Invalid or expired token.' });
            }

            // Attach decoded user info to the request
            req.user = decoded;
            next();
        });
        
    } catch (error) {
        console.error('Auth Middleware Error:', error.message);
        return res.status(500).json({
            status: false,
            message: 'Internal Server Error',
            error: error.message
        });
    }
}

module.exports = authToken;
