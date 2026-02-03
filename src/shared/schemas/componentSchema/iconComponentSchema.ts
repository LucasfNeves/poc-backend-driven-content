import z from 'zod';
import { colorSchema, materialIconSchema } from './schemaBaseEnums';

export const iconComponentSchema = z.object({
  type: z.literal('icon'),
  id: z.string().optional(),
  iconType: z.enum(['material', 'cupertino']).optional(),
  icon: materialIconSchema,
  size: z.number().positive('Icon size must be a positive number').optional(),
  color: colorSchema.optional(),
});
