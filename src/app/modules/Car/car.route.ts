import { validateRequest } from './../../middleware/validateRequest';
import { Router } from 'express';
import {
  createCarController,
  deleteSingleCarCarController,
  getAllCarCarController,
  getSingleCarCarController,
  returnBookingController,
  updateSingleCarCarController,
} from './car.controller';
import { carSchemaWithZod } from './car.validation';
import { auth } from '../../middleware/auth';
import { USER_Role } from '../User/user.constanat';

const router = Router();
router.post('/',auth(USER_Role.admin), validateRequest(carSchemaWithZod), createCarController);
router.get('/', getAllCarCarController);
router.get('/:id', getSingleCarCarController);
router.put('/return',auth(USER_Role.admin), returnBookingController);
router.put('/:id',auth(USER_Role.admin), updateSingleCarCarController);
router.delete('/:id',auth(USER_Role.admin), deleteSingleCarCarController);

export const carRoute = router;
