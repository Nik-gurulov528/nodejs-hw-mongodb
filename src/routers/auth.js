import { Router } from 'express';
import { validateBody } from '../validation/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  clearSessionController,
  loginController,
  refreshSessionController,
  registerController,
  resetPasswordController,
  sendResetEmailController,
} from '../controllers/auth.js';
import {
  loginValidation,
  registerValidation,
  resetPasswordValidation,
  sendResetEmailValidation,
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

router.post(
  '/send-reset-email',
  validateBody(sendResetEmailValidation),
  ctrlWrapper(sendResetEmailController),
);
router.post(
  '/reset-pwd',
  validateBody(resetPasswordValidation),
  ctrlWrapper(resetPasswordController),
);

export default router;
