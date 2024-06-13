import { Schema, model } from "mongoose";
import { TBooking } from "./booking.interface";



const bookingSchema = new Schema<TBooking>({
  date: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  car: {
    type: Schema.Types.ObjectId,
    ref: 'Car', 
    required: true
  },
  startTime: {
    type: String,
    required: true
  },
  endTime: {
    type: String,
    default: null,
   
  },
  totalCost: {
    type: Number,
    default:0,
  
  },
  // isBooked: {
  //   type: String,
  //   enum : ['confirmed',"unconfirmed"],
  //   default:"confirmed",
  //   required: true
  // }
}, {
  timestamps: true 
});

export const Booking =model('booking', bookingSchema);

