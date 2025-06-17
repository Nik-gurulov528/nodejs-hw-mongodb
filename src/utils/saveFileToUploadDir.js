import * as fs from 'node:fs/promises';
import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from '../constants/multerOptions.js';
import path from 'node:path';
import { getEnvData } from './getEnvData.js';

export const saveFileToUploadDir = async (file) => {
  fs.rename(
    path.join(TEMP_UPLOAD_DIR, file.filename),
    path.join(UPLOAD_DIR, file.filename),
  );

  return `${getEnvData('APP_DOMAIN')}/uploads/${file.filename}`;
};
