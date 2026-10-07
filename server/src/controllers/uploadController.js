import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { isCloudinaryConfigured, cloudinaryConfig } from '../config/cloudinary.js';
import { AppConfig } from '../models/index.js';
import crypto from 'crypto';

function sha1(str) {
  return crypto.createHash('sha1').update(str).digest('hex');
}

function signParams(paramsToSign) {
  const paramString = Object.keys(paramsToSign).sort()
    .map(k => `${k}=${paramsToSign[k]}`).join('&');
  return sha1(paramString + cloudinaryConfig.apiSecret);
}

async function getActiveConfig() {
  if (isCloudinaryConfigured()) return cloudinaryConfig;
  const dbConfig = await AppConfig.findOne();
  if (dbConfig && dbConfig.cloudinaryCloudName && dbConfig.cloudinaryApiKey && dbConfig.cloudinaryApiSecret) {
    cloudinaryConfig.cloudName = dbConfig.cloudinaryCloudName;
    cloudinaryConfig.apiKey = dbConfig.cloudinaryApiKey;
    cloudinaryConfig.apiSecret = dbConfig.cloudinaryApiSecret;
    return cloudinaryConfig;
  }
  return null;
}

export const uploadImage = asyncHandler(async (req, res) => {
  const config = await getActiveConfig();
  if (!config || !config.cloudName) {
    throw new ApiError(500, 'Cloudinary is not configured. Set Cloudinary credentials either in server/.env or via Admin Panel > Configuration.');
  }

  const { image, folder } = req.body;
  if (!image || typeof image !== 'string') {
    throw new ApiError(400, 'Image data is required (base64 data URL).');
  }

  if (!image.startsWith('data:')) {
    throw new ApiError(400, 'Image must be a base64 data URL.');
  }

  const timestamp = Math.round(Date.now() / 1000);
  const uploadFolder = folder || 'gonomukti';
  const paramsToSign = { timestamp, folder: uploadFolder };
  const signature = signParams(paramsToSign);

  const formData = new FormData();
  formData.append('file', image);
  formData.append('api_key', config.apiKey);
  formData.append('timestamp', String(timestamp));
  formData.append('folder', uploadFolder);
  formData.append('signature', signature);

  const cloudRes = await fetch(
    `https://api.cloudinary.com/v1_1/${config.cloudName}/image/upload`,
    { method: 'POST', body: formData }
  );

  if (!cloudRes.ok) {
    const errText = await cloudRes.text();
    console.error('Cloudinary upload error:', errText);
    throw new ApiError(502, 'Cloudinary upload failed.');
  }

  const result = await cloudRes.json();
  res.json({
    success: true,
    data: {
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
    },
    message: 'Image uploaded successfully.',
  });
});
