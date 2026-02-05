import z from 'zod';
import { colorSchema, materialIconSchema } from './schemaBaseEnums';

export const iconComponentSchema = z.object({
  type: z.literal('icon'),
  iconType: z.enum(['material', 'cupertino']).optional(),
  icon: materialIconSchema,
  size: z.number().positive('Icon size must be a positive number').optional(),
  color: colorSchema.optional(),
});

export type IconComponentSchema = z.infer<typeof iconComponentSchema>;
