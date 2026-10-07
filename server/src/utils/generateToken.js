import jwt from 'jsonwebtoken';

export function generateToken(userId) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET || 'fallback-dev-secret', {
    expiresIn: '7d',
  });
}
