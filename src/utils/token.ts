import logger from '@config/logger';
import jwt from 'jsonwebtoken';

const JWT_SECRET_KEY = process.env.JWT_SECRET || 'weather';

function generateToken(email: string) {
  return jwt.sign({ email }, JWT_SECRET_KEY, { expiresIn: '7d' });
}

function verifyToken(token: string): string | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY) as { email: string };
    return decoded.email;
  } catch (error) {
    logger.error('decoded error' + error);
    return null;
  }
}

export { generateToken, verifyToken };
