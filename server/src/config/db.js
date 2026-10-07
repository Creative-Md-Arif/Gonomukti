import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export async function connectDB() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error('ERROR: MONGO_URI is not set in .env. Please configure it before starting the server.');
    process.exit(1);
  }
  try {
    await mongoose.connect(uri);
    console.log('MongoDB connected successfully.');
  } catch (err) {
    console.error('ERROR: MongoDB connection failed:', err.message);
    process.exit(1);
  }
}
