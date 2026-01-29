import z from 'zod';

const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export const getComponentsRequestSchema = z.object({
  query: z.object({
    id: z
      .string()
      .refine((val) => uuidRegex.test(val), { message: 'ID must be a valid UUID' })
      .optional(),
    name: z.string().optional(),
  }),
});

export type GetComponentsRequest = z.infer<typeof getComponentsRequestSchema>;
