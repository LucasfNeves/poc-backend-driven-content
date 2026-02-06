import z from 'zod';
import { mainAxisAlignmentSchema, crossAxisAlignmentSchema } from './schemaBaseEnums';
import { componentSchema } from './componentSchema';

export const rowComponentSchema = z.object({
  type: z.literal('row'),
  mainAxisAlignment: mainAxisAlignmentSchema.optional(),
  crossAxisAlignment: crossAxisAlignmentSchema.optional(),
  spacing: z.number().min(0, 'Spacing must be 0 or greater').optional(),
  get children() {
    return z.array(componentSchema).optional();
  },
});

export type RowComponentSchema = z.infer<typeof rowComponentSchema>;
