import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const jwtKey = process.env.JWT_SECRET_KEY || '';
export const authenticateToken = async (req, res, next) => {
    // TODO: verify the token exists and add the user data to the request object
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    console.log(token);
    if (!token) {
        return res.status(401).send('No token found!');
    }
    jwt.verify(token, jwtKey, (err, user) => {
        if (err) {
            return res.status(401).send('Invalid token!');
        }
        req.user = user;
        return next();
    });
    return;
};
