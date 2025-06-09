import { Router } from 'express';
import { validateBody } from '../validation/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  clearSessionController,
  loginController,
  refreshSessionController,
  registerController,
} from '../controllers/auth.js';
import {
  loginValidation,
  registerValidation,
} from '../validation/validationSchemas.js';

const router = Router();

router.post(
  '/register',
  validateBody(registerValidation),
  ctrlWrapper(registerController),
);

router.post(
  '/login',
  validateBody(loginValidation),
  ctrlWrapper(loginController),
);
router.post('/refresh', ctrlWrapper(refreshSessionController));
router.post('/logout', ctrlWrapper(clearSessionController));

export default router;
