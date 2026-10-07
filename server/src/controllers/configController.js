import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { AppConfig } from '../models/index.js';
import { cloudinaryConfig } from '../config/cloudinary.js';

const SENSITIVE_KEYS = ['cloudinaryApiSecret', 'jwtSecret'];

function maskValue(key, value) {
  if (!value) return '';
  if (SENSITIVE_KEYS.includes(key)) {
    return value.length > 4 ? '••••••••' + value.slice(-4) : '••••';
  }
  return value;
}

export const getConfig = asyncHandler(async (_req, res) => {
  let config = await AppConfig.findOne();
  if (!config) {
    config = await AppConfig.create({});
  }
  const masked = {};
  for (const key of Object.keys(config.toObject())) {
    if (key === '_id' || key === '__v' || key === 'createdAt' || key === 'updatedAt') continue;
    masked[key] = maskValue(key, config[key]);
  }
  res.json({ success: true, data: masked, message: 'App config fetched.' });
});

export const updateConfig = asyncHandler(async (req, res) => {
  let config = await AppConfig.findOne();
  if (!config) {
    config = await AppConfig.create({});
  }

  const allowedKeys = [
    'cloudinaryCloudName',
    'cloudinaryApiKey',
    'cloudinaryApiSecret',
    'clientUrl',
    'jwtSecret',
  ];

  for (const key of allowedKeys) {
    if (req.body[key] !== undefined && req.body[key] !== '') {
      if (req.body[key] === '••••••••' || req.body[key].startsWith('••••')) {
        continue;
      }
      config[key] = req.body[key];
    }
  }

  await config.save();

  if (config.cloudinaryCloudName) {
    cloudinaryConfig.cloudName = config.cloudinaryCloudName;
    cloudinaryConfig.apiKey = config.cloudinaryApiKey;
    cloudinaryConfig.apiSecret = config.cloudinaryApiSecret;
  }

  const masked = {};
  for (const key of allowedKeys) {
    masked[key] = maskValue(key, config[key]);
  }
  res.json({ success: true, data: masked, message: 'Configuration updated successfully.' });
});
