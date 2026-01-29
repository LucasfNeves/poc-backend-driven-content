import z from 'zod';
import { uuidSchema } from './common';

export const getComponentsRequestSchema = z.object({
  query: z.object({
    id: uuidSchema.optional(),
    name: z.string().optional(),
  }),
});

export type GetComponentsRequest = z.infer<typeof getComponentsRequestSchema>;
