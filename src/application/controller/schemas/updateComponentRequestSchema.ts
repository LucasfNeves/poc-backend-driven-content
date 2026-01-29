import z from 'zod';
import { nameSchema } from './common';

export const updateComponentRequestSchema = z.object({
  params: z.object({
    name: nameSchema,
  }),
  body: z.object({
    component: z
      .object({
        type: z.string().min(1, 'Component type is required'),
      })
      .catchall(z.unknown()),
  }),
});

export type UpdateComponentRequest = z.infer<typeof updateComponentRequestSchema>;
