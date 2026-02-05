import z from 'zod';
import { colorSchema } from './schemaBaseEnums';
import { componentSchema } from './componentSchema';

export const scaffoldComponentSchema = z.lazy(() =>
  z
    .object({
      type: z.literal('scaffold'),
      appBar: componentSchema.optional(),
      body: componentSchema.optional(),
      backgroundColor: colorSchema.optional(),
      floatingActionButton: componentSchema.optional(),
    })
    .strict(),
);

export type ScaffoldComponentSchema = z.infer<typeof scaffoldComponentSchema>;
