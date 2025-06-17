import cloudinary from 'cloudinary';
import { getEnvData } from './getEnvData.js';
import * as fs from 'node:fs/promises';

cloudinary.v2.config({
  secure: true,
  cloud_name: getEnvData('CLOUDINARY_NAME'),
  api_key: getEnvData('API_KEY'),
  api_secret: getEnvData('API_SECRET'),
});

export const saveFileToCloudinary = async (file) => {
  const response = await cloudinary.v2.uploader.upload(file.path);
  await fs.unlink(file.path);
  return response.secure_url;
};
