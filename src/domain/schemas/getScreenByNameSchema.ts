import { z } from 'zod';

export const getScreenByNameParamsSchema = z.object({
  name: z
    .string({ error: 'name is required' })
    .min(1, 'name cannot be empty')
    .max(100, 'name cannot exceed 100 characters'),
});

export type GetScreenByNameParamsDTO = z.infer<typeof getScreenByNameParamsSchema>;
