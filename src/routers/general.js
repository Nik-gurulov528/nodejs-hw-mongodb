import { Router } from 'express';
import contactsRoter from './contacts.js';
import authRouter from './auth.js';
import express from 'express';
import { UPLOAD_DIR } from '../constants/multerOptions.js';
import { swaggerDocs } from '../middlewares/swaggerDocs.js';

const router = Router();

router.use('/contacts', contactsRoter);
router.use('/auth', authRouter);
router.use('/uploads', express.static(UPLOAD_DIR));
router.use('/api-docs', swaggerDocs());

export default router;
