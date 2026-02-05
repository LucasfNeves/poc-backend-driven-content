import z from 'zod';
import { edgeInsetsSchema } from './edgeInsetsSchema';
import { componentSchema } from './componentSchema';

export const paddingComponentSchema = z.lazy(() =>
  z
    .object({
      type: z.literal('padding'),
      padding: edgeInsetsSchema,
      child: componentSchema.optional(),
    })
    .strict(),
);

export type PaddingComponentSchema = z.infer<typeof paddingComponentSchema>;
