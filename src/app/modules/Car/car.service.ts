import httpStatus from 'http-status';
import { AppError } from '../../errors/AppError';
import { Booking } from '../Booking/booking.model';
import { TCar, TReturn } from './car.interface';
import { Car } from './car.model';

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

export const carReturn = async (payload: TReturn) => {
  const { bookingId, endTime } = payload;
  const BookingData = await Booking.findById(bookingId).populate('car user');
  if (!BookingData) {
    throw new AppError(httpStatus.BAD_REQUEST, 'This Booking is not found');
  }
  // console.log({line:45,BookingData,BData:'333'});
  const carData = await Car.findOne({ _id: BookingData.car });
  // console.log(BookingData.car);
  // console.log(carData.pricePerHour);
  if (!carData) {
    throw new AppError(httpStatus.BAD_REQUEST, 'This Booking is not found');
  }
  const { pricePerHour } = carData;
  if (pricePerHour == null || pricePerHour == undefined) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Give Price per Hour');
  }
  const { startTime } = BookingData;
  const startTimeR = new Date(`1999-01-01T${startTime}`);
  const endTimeS = new Date(`1999-01-01T${endTime}`);
  const startTimeNumber = Number(startTimeR);
  const endTimeNumber = Number(endTimeS);
  if (startTimeNumber > endTimeNumber) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'End Time must be gather Then Start Time',
    );
  }
  const rantHours = endTimeNumber - startTimeNumber;
  const rantHoursDistance = rantHours / 3600000;
  const rantHoursMoney = rantHoursDistance * pricePerHour;
  const result = await Booking.findByIdAndUpdate(
    bookingId,
    { endTime, totalCost: rantHoursMoney },
    { new: true, upsert: true },
  ).populate('car user');

  return result;
};
