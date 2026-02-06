import z from 'zod';
import { colorSchema } from './schemaBaseEnums';
import { componentSchema } from './componentSchema';

export const scaffoldComponentSchema = z.object({
  type: z.literal('scaffold'),
  get appBar() {
    return componentSchema.optional();
  },
  get body() {
    return componentSchema.optional();
  },
  backgroundColor: colorSchema.optional(),
  get floatingActionButton() {
    return componentSchema.optional();
  },
});

export type ScaffoldComponentSchema = z.infer<typeof scaffoldComponentSchema>;
