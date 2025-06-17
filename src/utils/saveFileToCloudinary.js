import cloudinary from 'cloudinary';
import * as fs from 'node:fs/promises';
import { getEnvData } from './getEnvData.js';

const cloudinaryOptions = {
  name: await getEnvData('CLOUD_NAME'),
  key: await getEnvData('API_KEY'),
  secret: await getEnvData('API_SECRET'),
};

cloudinary.v2.config({
  secure: true,
  cloud_name: cloudinaryOptions.name,
  api_key: cloudinaryOptions.key,
  api_secret: cloudinaryOptions.secret,
});

export const saveFileToCloudinary = async (file) => {
  const response = await cloudinary.v2.uploader.upload(file.path);
  await fs.unlink(file.path);
  return response.secure_url;
};
