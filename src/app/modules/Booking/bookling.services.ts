// import { QueryBuilder } from '../../builder/QueryBulider';
import httpStatus, { NOT_FOUND } from 'http-status';
import { AppError } from '../../errors/AppError';
import { TBooking, TReturn } from './booking.interface';
import { Booking } from './booking.model';
import { haha } from './booking.controller';

export const createBookingServices = async (payload: TBooking) => {
  // const result = (
  //   await (await Booking.create(payload)).populate('car')
  // ).populate('user');
  const result = (
    await (await Booking.create(payload)).populate('user')
  ).populate('car');
  return result;
};
export const getAllBookingServices = async (search: haha) => {
  const result = await Booking.find(search).populate('car');
  // console.log(search,'ser');
  // const {carId,date,isBooked}=search;

  // const id=query.id
  //   const searchableField = ['carId._id,date,isBooked'];
  //   const BookingQuery = new QueryBuilder(
  //     Booking.find().populate('car').populate('user'),
  //     query)
  //     .fields()
  //   const result = await BookingQuery.modelQuery;

  // const result = await Booking.find(search)
  // id: { $regex: query },
  // $or:[field]: { $regex: searchTerm, $options: 'i' },

  // .populate('car')
  // .populate('user');
  return result;
};

export const myBookingServices = async (email: string) => {};
// export const myBookingServices = async (email: string) => {
//   // console.log(3);
//   const allBooking=await Booking.find().populate('user')
//   if(!allBooking){
//     throw new AppError(NOT_FOUND,'not found')
//   }
//   allBooking.map((el)=>{
//    await Booking.find(el.user.email:email).populate('user')
//     // const result = Booking.find({ el.user.email:email }).populate('User');
//     console.log(result);
//     return result
//   })

// console.log(allBooking.user.email);
// const {email}=allBooking.user
// console.log(email);
// console.log(allBooking);
// const {email}=allBooking.user;
// console.log(email);

// return result;
// };
export const bookingReturn = async (payload: TReturn) => {
  // const result = await Booking.find({ email }).populate('User');
  const { bookingId, endTime } = payload;
  const BookingData = await Booking.findById(bookingId)
    .populate('car')
    .populate('user');
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
