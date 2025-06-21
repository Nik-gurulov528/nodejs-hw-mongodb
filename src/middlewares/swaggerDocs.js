import createHttpError from 'http-errors';
import { swaggerJSON } from '../constants/swaggerJSON.js';
import * as fs from 'node:fs/promises';
import swaggerUI from 'swagger-ui-express';

export const swaggerDocs = () => {
  try {
    const swaggerDoc = JSON.parse(fs.readFileSync(swaggerJSON).toString());
    return [...swaggerUI.serve, swaggerUI.setup(swaggerDoc)];
  } catch {
    return (req, res, next) => {
      next(createHttpError(500, 'There is no swagger file!'));
    };
  }
};
