import { Router } from 'express';
import { userRoute } from '../modules/User/user.route';
import { carRoute } from '../modules/Car/car.route';
import { bookingRoute } from '../modules/Booking/bookling.rotue';


export const router = Router();

const moduleRouts = [
  {
    path: '/auth',
    route: userRoute,
  },
  {
    path: '/cars',
    route: carRoute,
  },
  {
    path: '/booking',
    route: bookingRoute,
  },
];

moduleRouts.forEach((route) => router.use(route.path, route.route));
