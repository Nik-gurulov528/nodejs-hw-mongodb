import { Router } from 'express';
import {
  createContactController,
  deleteContactController,
  getAllContactsController,
  getExactContactController,
  updateContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../validation/validateBody.js';
import {
  createValidation,
  updateValidation,
} from '../validation/validationSchemas.js';
import { isValidId } from '../validation/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.get('/', authenticate, ctrlWrapper(getAllContactsController));
router.get(
  '/:contactId',
  authenticate,
  isValidId,
  ctrlWrapper(getExactContactController),
);

router.post(
  '/',
  authenticate,
  validateBody(createValidation),
  ctrlWrapper(createContactController),
);

router.patch(
  '/:contactId',
  authenticate,
  isValidId,
  validateBody(updateValidation),
  ctrlWrapper(updateContactController),
);

router.delete(
  '/:contactId',
  authenticate,
  isValidId,
  ctrlWrapper(deleteContactController),
);

export default router;
