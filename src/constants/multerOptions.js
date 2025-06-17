import path from 'node:path';
import { cwd } from 'node:process';

export const TEMP_UPLOAD_DIR = path.join(cwd(), 'src', 'tmp');

export const UPLOAD_DIR = path.join(cwd(), 'src', 'uploads', 'photos');
