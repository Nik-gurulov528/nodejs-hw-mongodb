import cloudinary from 'cloudinary';
import * as fs from 'node:fs/promises';
import { getEnvData } from './getEnvData.js';

const initCloudinarySettings = async () => {
  cloudinary.v2.config({
    secure: true,
    cloud_name: await getEnvData('CLOUD_NAME'),
    api_key: await getEnvData('API_KEY'),
    api_secret: await getEnvData('API_SECRET'),
  });
};

await initCloudinarySettings();

export const saveFileToCloudinary = async (file) => {
  const response = await cloudinary.v2.uploader.upload(file.path);
  await fs.unlink(file.path);
  return response.secure_url;
};
