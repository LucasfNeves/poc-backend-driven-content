import z from 'zod';
import { iconComponentSchema } from './iconComponentSchema';

export const iconButtonComponentSchema = z.object({
  type: z.literal('iconButton'),
  id: z.string().optional(),
  icon: iconComponentSchema,
  onPressed: z
    .object({
      action: z.string().min(1, 'Action name is required').optional(),
      route: z.string().min(1, 'Route path is required').optional(),
      params: z.record(z.string(), z.unknown()).optional(),
    })
    .optional(),
});
