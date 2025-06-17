import cloudinary from 'cloudinary';
import * as fs from 'node:fs/promises';
import { getCloudinaryData } from '../constants/getCloudinaryData.js';

cloudinary.v2.config({
  secure: true,
  cloud_name: await getCloudinaryData('name'),
  api_key: await getCloudinaryData('key'),
  api_secret: await getCloudinaryData('secret'),
});

export const saveFileToCloudinary = async (file) => {
  const response = await cloudinary.v2.uploader.upload(file.path);
  await fs.unlink(file.path);
  return response.secure_url;
};
