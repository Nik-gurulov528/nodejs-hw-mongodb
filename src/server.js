import express from 'express';
import dotenv from 'dotenv';
import pino from 'pino-http';
import cors from 'cors';
import { getEnvData } from './utils/getEnvData.js';
import router from './routers/general.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { ctrlWrapper } from './utils/ctrlWrapper.js';
import cookieParser from 'cookie-parser';

export const setupServer = () => {
  const app = express();

  dotenv.config();

  app.use(express.json());
  app.use(cors());
  app.use(cookieParser());

  app.use(pino({ transport: { target: 'pino-pretty' } }));

  app.use(router);

  const PORT = Number(getEnvData('PORT'));

  app.use(ctrlWrapper(notFoundHandler));

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
