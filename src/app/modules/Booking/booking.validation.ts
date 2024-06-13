import {  z } from 'zod';

export const BookingSchemaWithZod = z.object({
  body: z.object({
    car: z.string(),
    startTime: z.string(),
    isBooked: z.enum(['confirmed', 'unconfirmed']).default("unconfirmed"),
  }),
});
