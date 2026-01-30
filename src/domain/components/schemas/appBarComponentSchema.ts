import z from 'zod';
import { textComponentSchema } from './textComponentSchema';
import { imageComponentSchema } from './imageComponentSchema';
import { iconButtonComponentSchema } from './iconButtonComponentSchema';

export const appBarComponentSchema = z.object({
  type: z.literal('appBar'),
  id: z.string().optional(),
  title: z.union([textComponentSchema, imageComponentSchema]).optional(),
  backgroundColor: z.string().optional(),
  foregroundColor: z.string().optional(),
  elevation: z.number().optional(),
  centerTitle: z.boolean().optional(),
  leading: iconButtonComponentSchema.optional(),
  actions: z.array(iconButtonComponentSchema).optional(),
});
