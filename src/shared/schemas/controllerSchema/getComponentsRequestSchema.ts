import z from 'zod';
import { nameSchema, uuidSchema } from '../common';

const cleanValue = (val: unknown) => (!val || val === 'null' || val === '' ? undefined : val);

export const getComponentsRequestSchema = z.object({
  query: z.object({
    id: z.preprocess(cleanValue, uuidSchema.optional()),
    name: z.preprocess(cleanValue, nameSchema.optional()),
  }),
});

export type GetComponentsRequest = z.infer<typeof getComponentsRequestSchema>;
