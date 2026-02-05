import z from 'zod';
import { boxFitSchema } from './schemaBaseEnums';

export const imageComponentSchema = z.object({
  type: z.literal('image'),
  src: z.string().min(1, 'Image source URL is required'),
  width: z.number().positive('Width must be a positive number').optional(),
  height: z.number().positive('Height must be a positive number').optional(),
  fit: boxFitSchema.optional(),
});

export type ImageComponentSchema = z.infer<typeof imageComponentSchema>;
