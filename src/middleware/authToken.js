import jwt from 'jsonwebtoken';

export default function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.sendStatus(401);
  }

  return jwt.verify(token, process.env.TOKEN_SECRET, (err) => {
    if (err) {
      return res.sendStatus(403);
    }
    return next();
  });
}
