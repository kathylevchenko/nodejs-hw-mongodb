import { Router } from 'express';
import express from 'express';

import {
  getAllContactsController,
  getContactByIdController,
  createContactController,
  updateContactController,
  deleteContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contacts.js';
import { authenticate } from '../middlewares/authenticate.js';
import { ROLES } from '../constants/index.js';
import { checkRoles } from '../middlewares/checkRoles.js';
import { upload } from '../middlewares/multers.js';

const contactRoutes = Router();

const jsonParser = express.json();

contactRoutes.use(authenticate);

contactRoutes.get(
  '/',
  checkRoles(ROLES.AUTOR),
  ctrlWrapper(getAllContactsController),
);

contactRoutes.get(
  '/:contactId',
  checkRoles(ROLES.AUTOR),
  isValidId,
  ctrlWrapper(getContactByIdController),
);

contactRoutes.post(
  '/',
  jsonParser,
  upload.single('photo'),
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);

contactRoutes.patch(
  '/:contactId',
  jsonParser,
  upload.single('photo'),
  checkRoles(ROLES.AUTOR),
  validateBody(updateContactSchema),
  ctrlWrapper(updateContactController),
);

contactRoutes.delete(
  '/:contactId',
  checkRoles(ROLES.AUTOR),
  isValidId,
  ctrlWrapper(deleteContactController),
);

export default contactRoutes;
