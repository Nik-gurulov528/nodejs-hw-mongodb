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

const router = Router();

router.get('/contacts', ctrlWrapper(getAllContactsController));
router.get(
  '/contacts/:contactId',
  isValidId,
  ctrlWrapper(getExactContactController),
);

router.post(
  '/contacts',
  validateBody(createValidation),
  ctrlWrapper(createContactController),
);

router.patch(
  '/contacts/:contactId',
  isValidId,
  validateBody(updateValidation),
  ctrlWrapper(updateContactController),
);

router.delete(
  '/contacts/:contactId',
  isValidId,
  ctrlWrapper(deleteContactController),
);

export default router;
