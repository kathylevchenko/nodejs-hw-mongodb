import express from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  registerController,
  loginController,
  logoutController,
  refreshController,
  requestResetEmailController,
  resetPasswordController,
} from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  registerSchema,
  loginSchema,
  requestResetEmailSchema,
  resetPasswordSchema,
} from '../validation/auth.js';
import { getGoogleOAuthUrlController } from '../controllers/auth.js';
import { loginWithGoogleOAuthSchema } from '../validation/auth.js';
import { loginWithGoogleController } from '../controllers/auth.js';

const authRoutes = express.Router();
const jsonParser = express.json();

authRoutes.post(
  '/register',
  jsonParser,
  validateBody(registerSchema),
  ctrlWrapper(registerController),
);

authRoutes.post(
  '/login',
  jsonParser,
  validateBody(loginSchema),
  ctrlWrapper(loginController),
);

authRoutes.post('/logout', ctrlWrapper(logoutController));

authRoutes.post('/refresh', ctrlWrapper(refreshController));

authRoutes.post(
  '/send-reset-email',
  jsonParser,
  validateBody(requestResetEmailSchema),
  ctrlWrapper(requestResetEmailController),
);

authRoutes.post(
  '/reset-pwd',
  jsonParser,
  validateBody(resetPasswordSchema),
  ctrlWrapper(resetPasswordController),
);

authRoutes.get('/get-oauth-url', ctrlWrapper(getGoogleOAuthUrlController));

authRoutes.post(
  '/confirm-oauth',
  jsonParser,
  validateBody(loginWithGoogleOAuthSchema),
  ctrlWrapper(loginWithGoogleController),
);
export default authRoutes;
