import z from 'zod';
import { uuidSchema } from './common';

export const getComponentsRequestSchema = z.object({
  query: z
    .object({
      id: uuidSchema,
      name: z.string(),
    })
    .partial(),
});

export type GetComponentsRequest = z.infer<typeof getComponentsRequestSchema>;
