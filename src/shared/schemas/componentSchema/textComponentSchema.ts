import z from 'zod';
import { colorSchema, fontWeightSchema } from './schemaBaseEnums';

export const textComponentSchema = z.object({
  type: z.literal('text'),
  id: z.string().optional(),
  data: z.string().min(1, 'Text data is required'),
  style: z
    .object({
      fontSize: z.number().positive('Font size must be a positive number').optional(),
      fontWeight: fontWeightSchema.optional(),
      color: colorSchema.optional(),
    })
    .optional(),
});
