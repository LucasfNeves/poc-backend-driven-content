import z from 'zod';
import { appBarComponentSchema } from './appBarComponentSchema';

export const scaffoldComponentSchema = z.object({
  type: z.literal('scaffold'),
  id: z.string().optional(),
  backgroundColor: z.string().optional(),
  appBar: appBarComponentSchema.optional(),
  body: z.unknown().optional(),
});
