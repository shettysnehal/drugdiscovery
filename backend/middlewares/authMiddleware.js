import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const authenticateJWT = (req, res, next) => {
    // Extract the token from the Authorization header
    const token = req.headers['authorization']?.split(' ')[1];
    console.log('Token:', token); // Log the token for debugging

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                console.error('JWT verification error:', err); // Log the error
                return res.status(403).json({ msg: 'Forbidden' });
            }
            console.log('Decoded user:', user); // Log the decoded user
            req.user = user; // Assign the user info to req.user
            next(); // Proceed to the next middleware/route handler
        });
    } else {
        console.log('No token provided'); // Log if no token is found
        res.status(401).json({ msg: 'Unauthorized' });
    }
};
