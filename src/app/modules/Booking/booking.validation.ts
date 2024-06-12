import { z } from 'zod';

export const BookingSchemaWithZod = z.object({
  body: z.object({
    user: z.string(),
    car: z.string(),
    startTime: z.string(),
    endTime: z.string(),
    totalCost: z.number(),
    isBooked: z.enum(['confirmed', 'unconfirmed']).default("unconfirmed"),
  }),
});
