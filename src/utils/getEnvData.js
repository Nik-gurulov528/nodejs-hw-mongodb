import dotenv from 'dotenv';

dotenv.config();

export const getEnvData = async (name, defaultValue) => {
  const value = process.env[name];

  if (value) {
    return value;
  }
  if (defaultValue !== undefined) {
    return defaultValue;
  }

  throw new Error(`${name} was not found!`);
};
