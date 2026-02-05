import z from 'zod';
import { uuidSchema } from '../common';

export const deleteComponentRequestSchema = z.object({
  params: z.object({
    id: uuidSchema,
  }),
});

export type DeleteComponentRequest = z.infer<typeof deleteComponentRequestSchema>;
