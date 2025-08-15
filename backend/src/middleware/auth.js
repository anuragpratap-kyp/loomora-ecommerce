import jwt from 'jsonwebtoken';
export const protect = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ message: 'No token' });
  const token = auth.split(' ')[1];
  try { req.user = jwt.verify(token, process.env.JWT_SECRET); next(); }
  catch { return res.status(401).json({ message: 'Invalid token' }); }
};
export const admin = (req, res, next) => (req.user && req.user.isAdmin) ? next() : res.status(403).json({ message: 'Admin only' });