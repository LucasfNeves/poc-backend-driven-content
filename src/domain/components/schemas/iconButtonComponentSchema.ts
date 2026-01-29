import z from 'zod';
import { iconComponentSchema } from './iconComponentSchema';

export const iconButtonComponentSchema = z.object({
  type: z.literal('iconButton'),
  id: z.string().optional(),
  icon: iconComponentSchema,
  onPressed: z
    .object({
      action: z.string().optional(),
      route: z.string().optional(),
      params: z.record(z.string(), z.unknown()).optional(),
    })
    .optional(),
});
