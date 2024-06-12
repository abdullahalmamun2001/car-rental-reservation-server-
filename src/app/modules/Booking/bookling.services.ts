// import { QueryBuilder } from '../../builder/QueryBulider';
import { TBooking } from './booking.interface';
import { Booking } from './booking.model';

export const createBookingServices = async (payload: TBooking) => {
  const result = await Booking.create(payload);
  return result;
};
export const getAllBookingServices = async (query: Record<string, unknown>) => {
    // const id=query.id
  //   const searchableField = ['carId._id,date,isBooked'];
  //   const BookingQuery = new QueryBuilder(
  //     Booking.find().populate('car').populate('user'),
  //     query)
  //     .fields()
  //   const result = await BookingQuery.modelQuery;
  const result = await Booking.find({
    id: { $regex: query },
    // $or:[field]: { $regex: searchTerm, $options: 'i' },
  })
    .populate('car')
    .populate('user');
  return result;
};
