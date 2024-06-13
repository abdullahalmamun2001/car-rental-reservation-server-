import httpStatus from 'http-status';
import { AppError } from '../../errors/AppError';
import { Booking } from '../Booking/booking.model';
import { TCar, TReturn } from './car.interface';
import { Car } from './car.model';
import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;

export const createCarServices = async (payload: TCar) => {
  const result = await Car.create(payload);
  return result;
};
export const getAllCarServices = async () => {
  const result = await Car.find();
  return result;
};
export const getSingleCarServices = async (id: string) => {
  const result = await Car.findById(id);
  return result;
};
export const updateSingleCarServices = async (
  id: string,
  payload: Partial<TCar>,
) => {
  const result = await Car.findByIdAndUpdate(id, payload, {
    new: true,
    upsert: true,
  });
  return result;
};
export const deleteSingleCarServices = async (id: string) => {
  const result = await Car.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true, upsert: true },
  );
  return result;
};

export const carReturn = async (payload:TReturn) => {
  const { bookingId, endTime } = payload;
  console.log(bookingId,endTime);
  const BookingData = await Booking.findById(bookingId)
    .populate('car')
    .populate('user');
    console.log(BookingData);
  if (!BookingData) {
    throw new AppError(httpStatus.BAD_REQUEST, 'This Booking is not found');
  }
  const { startTime } = BookingData;
  const { pricePerHour } = BookingData.car;
  const startTimeR = new Date(`1999-01-01T${startTime}`);
  const endTimeS = new Date(`1999-01-01T${endTime}`);
  const startTimeNumber = Number(startTimeR);
  const endTimeNumber = Number(endTimeS);
  const rantHours = endTimeNumber - startTimeNumber;
  const rantHoursDistance = rantHours / 3600000;
  const rantHoursMoney = rantHoursDistance * pricePerHour;
  const result = await Booking.findByIdAndUpdate(
    bookingId,
    { endTime, totalCost: rantHoursMoney },
    { new: true, upsert: true },
  )
    .populate('car')
    .populate('user');

  return result;
};

