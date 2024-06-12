import { Router } from 'express';
import { validateRequest } from '../../middleware/validateRequest';
import { BookingSchemaWithZod } from './booking.validation';
import {
  createBookingController,
  getAllBookingController,
} from './booking.controller';

const router = Router();
router.post(
  '/',
  validateRequest(BookingSchemaWithZod),
  createBookingController,
);
router.get('/', getAllBookingController);
export const bookingRoute = router;
