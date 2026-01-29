import z from 'zod';
import { appBarComponentSchema } from './appBarComponentSchema';
import { textComponentSchema } from './textComponentSchema';
import { iconComponentSchema } from './iconComponentSchema';
import { iconButtonComponentSchema } from './iconButtonComponentSchema';

const bodyComponentSchema = z.union([
  textComponentSchema,
  iconComponentSchema,
  iconButtonComponentSchema,
]);

export const scaffoldComponentSchema = z.object({
  type: z.literal('scaffold'),
  id: z.string().optional(),
  backgroundColor: z.string().optional(),
  appBar: appBarComponentSchema.optional(),
  body: bodyComponentSchema.optional(),
});
