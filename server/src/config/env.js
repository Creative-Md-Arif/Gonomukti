import dotenv from 'dotenv';
dotenv.config();

export const env = {
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET || 'fallback-dev-secret',
  adminPassword: process.env.ADMIN_PASSWORD || 'admin123',
  port: process.env.PORT || 5000,
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
};
