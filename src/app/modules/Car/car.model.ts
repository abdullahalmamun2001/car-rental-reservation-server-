import { Schema, model } from 'mongoose';

export const carSchema = new Schema(
  {
    name: String,
    description: String,
    color: String,
    isElectric: Boolean,
    features: [String],
    pricePerHour: Number,
    isDeleted: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ['available', 'unavailable'],
      default: 'available',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Car = model('Car', carSchema);
