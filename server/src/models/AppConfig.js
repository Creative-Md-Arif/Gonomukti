import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const appConfigSchema = new Schema({
  cloudinaryCloudName: { type: String, default: '' },
  cloudinaryApiKey: { type: String, default: '' },
  cloudinaryApiSecret: { type: String, default: '' },
  clientUrl: { type: String, default: 'http://localhost:5173' },
  jwtSecret: { type: String, default: '' },
}, { timestamps: true });

export const AppConfig = model('AppConfig', appConfigSchema);
export default AppConfig;
