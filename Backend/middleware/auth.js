import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export async function authenticateJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'No token provided.' });

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Fetch full user from DB
    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'User not found.' });
    }

    req.user = user; // Now has full Sequelize user object with ID that exists
    next();
  } catch (err) {
    console.error(err);
    return res.status(403).json({ message: 'Invalid or expired token.' });
  }
}


export function isAdmin(req, res, next) {
  if (req.user && req.user.role === 'admin') {
    return next();
  }
  return res.status(403).json({ message: 'Only admin can perform this action.' });
}
