import { Router } from 'express';
import contactsRoter from './contacts.js';
import authRouter from './auth.js';

const router = Router();

router.use('/contacts', contactsRoter);
router.use('/auth', authRouter);

export default router;
