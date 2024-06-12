import { z } from 'zod';

export const UserSchemaWithZod = z.object({
  body: z.object({
    name: z.string(),
    email: z.string().email(),
    role: z.enum(['user', 'admin']),
    password: z.string(),
    phone: z.string(),
    address: z.string(),
  }),
});
