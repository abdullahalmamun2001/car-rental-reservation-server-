import { Router } from 'express';
import { validateRequest } from '../../middleware/validateRequest';
import { BookingSchemaWithZod } from './booking.validation';
import {
  createBookingController,
  getAllBookingController,
  myBookingServicesController,
  returnBookingController,
} from './booking.controller';
import { auth, authUser } from '../../middleware/auth';
import { USER_Role } from '../User/user.constanat';

const router = Router();
router.post(
  '/',
  validateRequest(BookingSchemaWithZod),
  authUser(USER_Role.user),
  createBookingController, 
);
// auth(USER_Role.user,USER_Role.admin),
router.get('/',auth(USER_Role.admin), getAllBookingController);
router.get('/my-booking', myBookingServicesController);
router.put('/return',auth(USER_Role.admin), returnBookingController);

export const bookingRoute = router;
