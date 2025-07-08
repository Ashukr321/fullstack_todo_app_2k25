import jwt from 'jsonwebtoken';
import envConfig from '../config/envConfig.js';


const isAuthenticated = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'] || req.headers['Authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        message: "No token provided!"
      });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        message: "Token missing! (Token missing hai!)"
      });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, envConfig.jwt_secret);
    } catch (err) {
      return res.status(401).json({
        message: "Invalid or expired token! (Galat ya expire token!)"
      });
    }

    if (!decoded || !decoded.userId) {
      return res.status(401).json({
        message: "Invalid token payload!"
      });
    }

    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(500).json({ 
      message: "Authentication failed!"
    });
  }
}

export default isAuthenticated;