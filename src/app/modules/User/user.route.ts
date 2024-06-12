import { Router } from 'express';
import { validateRequest } from '../../middleware/validateRequest';
import { UserSchemaWithZod } from './user.validation';
import { createUserController, createUserLoginController } from './user.controller';

const router = Router();

router.post(
  '/signup',
  validateRequest(UserSchemaWithZod),
  createUserController,
);
router.post(
  '/signin',
  createUserLoginController
  
);
export const userRoute = router;
