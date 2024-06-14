import { validateRequest } from './../../middleware/validateRequest';
import { Router } from 'express';
import {
  createCarController,
  deleteSingleCarCarController,
  getAllCarCarController,
  getSingleCarCarController,
  returnBookingController,
  // updateSingleCarCarController,
} from './car.controller';
import { carSchemaWithZod } from './car.validation';
import { auth, verifyToken } from '../../middleware/auth';
import { USER_Role } from '../User/user.constanat';

const router = Router();
router.put("/return",auth(USER_Role.admin), returnBookingController);
router.post('/',auth(USER_Role.admin), validateRequest(carSchemaWithZod), createCarController);
router.get('/',verifyToken(), getAllCarCarController);
router.get('/:id',verifyToken(), getSingleCarCarController);
router.put('/:id',auth(USER_Role.admin), returnBookingController);
router.delete('/:id',auth(USER_Role.admin), deleteSingleCarCarController);

export const carRoute = router;
