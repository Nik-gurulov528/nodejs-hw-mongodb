import mongoose from 'mongoose';
import { getEnvData } from '../utils/getEnvData.js';

export const initMongoConnection = async () => {
  try {
    const user = getEnvData('MONGODB_USER', '');
    const pswd = getEnvData('MONGODB_PASSWORD', '');
    const url = getEnvData('MONGODB_URL', '');
    const db = getEnvData('MONGODB_DB', '');

    await mongoose.connect(
      `mongodb+srv://${user}:${pswd}@${url}/${db}?retryWrites=true&w=majority&appName=Cluster0`,
    );
    console.log('Mongo connection successfully established!');
  } catch (error) {
    console.log('Mongo connection finished with error'), error;
    throw error;
  }
};
