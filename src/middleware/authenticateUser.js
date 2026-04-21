import jwt from 'jsonwebtoken';

export default function authenticateUser(req, res, next) {
  const authHeader = req.headers.authorization;
  const err = new Error('Not authenticated. Please provide valid token.');
  err.status = 401;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(err);
  }
  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: payload.id, role: payload.role };
    next();
  } catch (error) {
    throw err;
  }
}
