// containerComponentSchema.ts
import z from 'zod';
import { colorSchema } from './schemaBaseEnums';
import { componentSchema } from './componentSchema';

export const containerComponentSchema = z.object({
  type: z.literal('container'),
  width: z.number().positive('Width must be a positive number').optional(),
  height: z.number().positive('Height must be a positive number').optional(),
  color: colorSchema.optional(),
  get child() {
    return componentSchema.optional();
  },
});

export type ContainerComponentSchema = z.infer<typeof containerComponentSchema>;
