import z from 'zod';
import { edgeInsetsSchema } from './edgeInsetsSchema';
import { componentSchema } from './componentSchema';

export const paddingComponentSchema = z.object({
  type: z.literal('padding'),
  padding: edgeInsetsSchema,
  get child() {
    return componentSchema.optional();
  },
});

export type PaddingComponentSchema = z.infer<typeof paddingComponentSchema>;
