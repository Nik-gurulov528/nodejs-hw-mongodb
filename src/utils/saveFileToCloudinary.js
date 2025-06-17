import cloudinary from 'cloudinary';
import * as fs from 'node:fs/promises';
import { getEnvData } from './getEnvData.js';
import { CLOUDINARY } from '../constants/cloudinary.js';

cloudinary.v2.config({
  secure: true,
  cloud_name: await getEnvData(CLOUDINARY.CLOUD_NAME),
  api_key: await getEnvData(CLOUDINARY.API_KEY),
  api_secret: await getEnvData(CLOUDINARY.API_SECRET),
});

export const saveFileToCloudinary = async (file) => {
  const response = await cloudinary.v2.uploader.upload(file.path);
  await fs.unlink(file.path);
  return response.secure_url;
};
