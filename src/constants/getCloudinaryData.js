import { getEnvData } from '../utils/getEnvData.js';

export const getCloudinaryData = async (data) => {
  const result = {};
  result.name = await getEnvData('CLOUDINARY_NAME');
  result.key = await getEnvData('API_KEY');
  result.secret = await getEnvData('API_SECRET');

  return result[data];
};
