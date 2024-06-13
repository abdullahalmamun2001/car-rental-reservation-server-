import { TBooking } from './booking.interface';
import { Booking } from './booking.model';
import { queryObj } from './booking.controller';

export const createBookingServices = async (payload: TBooking) => {
  const result = (
    await (await Booking.create(payload)).populate('user')
  ).populate('carId');
  return result;
};
export const getAllBookingServices = async (search: queryObj) => {
  const result = await Booking.find(search).populate('car');
  return result;
};

export const myBookingServices = async () => {
  const allBooking=await Booking.find();
  return allBooking
};



// eslint-disable-next-line @typescript-eslint/no-explicit-any
 const getUsersBooking = async (userId: any) => {
  const result = await Booking.find({ user: userId }).populate("user car");
  return result;
};

export const bookingService={getUsersBooking}