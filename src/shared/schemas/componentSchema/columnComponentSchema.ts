import z from 'zod';
import { mainAxisAlignmentSchema, crossAxisAlignmentSchema } from './schemaBaseEnums';
import { componentSchema } from './componentSchema';

export const columnComponentSchema = z.lazy(() =>
  z
    .object({
      type: z.literal('column'),
      mainAxisAlignment: mainAxisAlignmentSchema.optional(),
      crossAxisAlignment: crossAxisAlignmentSchema.optional(),
      spacing: z.number().min(0, 'Spacing must be 0 or greater').optional(),
      children: z.array(componentSchema).optional(),
    })
    .strict(),
);

export type ColumnComponentSchema = z.infer<typeof columnComponentSchema>;
