import express from 'express';
import dotenv from 'dotenv';
import pino from 'pino-http';
import cors from 'cors';
import { getEnvData } from './utils/getEnvData.js';
import { getAllContacts } from './services/getAllContacts.js';
import { getExactContact } from './services/getExactContact.js';

export const setupServer = () => {
  const app = express();

  dotenv.config();

  app.use(express.json());
  app.use(cors());

  app.use(pino({ transport: { target: 'pino-pretty' } }));

  const PORT = Number(getEnvData('PORT'));

  app.get('/contacts', async (req, res) => {
    const allContacts = await getAllContacts();

    res.status(200).json({
      message: 'Successfully found contacts!',
      data: allContacts,
    });
  });

  app.get('/contacts/:contactId', async (req, res, next) => {
    const { contactId } = req.params;
    const exactContact = await getExactContact(contactId);

    if (!exactContact) {
      res.status(404).json({
        message: `Contact with id ${contactId} was not found!`,
      });
    } else {
      res.status(200).json({
        message: `Successfully found contact with id ${contactId}`,
        data: exactContact,
      });
    }
  });

  app.use((req, res, next) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  app.use((err, req, res, next) => {
    res.status(500).json({
      message: 'Sorry, something went wrong!',
      error: err,
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
