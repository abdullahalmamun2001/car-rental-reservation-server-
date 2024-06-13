// date: The date of the booking.
// user: Identifier for the user. (reference to user model)
// car: Identifier for the booked car. (reference to car model)
// startTime: The start time of the booking. The time will be in 24hr format.
// endTime: The end time of the booking. The time will be in 24hr format.
// totalCost: The total cost will be calculated using startTime, endTime and pricePerHour data. By default totalCost will be 0.
// isBooked: Indicates the booking status, whether it's unconfirmed or confirmed . By default, it will be unconfirmed.

import { Types } from 'mongoose';

export type TBooking = {
  date: Date,
  user: Types.ObjectId;
  car: Types.ObjectId;
  startTime: string;
  endTime: string | null;
  totalCost: number;
  // isBooked: 'unconfirmed' | 'confirmed';
};
// export type TReturn={
//   bookingId:string;
//   endTime:string;
// }