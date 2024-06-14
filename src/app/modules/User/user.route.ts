import { Router } from 'express';
import { validateRequest } from '../../middleware/validateRequest';
import { UserSchemaWithZod } from './user.validation';
import {
  createUserController,
  createUserLoginController,
  getAllUserController,
} from './user.controller';
import { verifyToken } from '../../middleware/auth';

const router = Router();

router.post(
  '/signup',
  validateRequest(UserSchemaWithZod),
  createUserController,
);
router.post('/signin', createUserLoginController);
router.get('/all-user',verifyToken(), getAllUserController);
export const userRoute = router;
