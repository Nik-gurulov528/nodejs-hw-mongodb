import path from 'node:path';
import { cwd } from 'node:process';

export const swaggerJSON = path.join(cwd(), 'docs', 'swagger.json');
