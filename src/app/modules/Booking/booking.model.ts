import { Schema, model } from "mongoose";
import { TBooking } from "./booking.interface";



const bookingSchema = new Schema<TBooking>({
  date: {
    type: Date,
    default:Date.now,
    required: true
  },
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
    required: true
  },
  totalCost: {
    type: Number,
    required: true
  },
  isBooked: {
    type: String,
    enum : ['confirmed',"unconfirmed"],
    default:"unconfirmed",
    required: true
  }
}, {
  timestamps: true 
});

export const Booking =model('booking', bookingSchema);

