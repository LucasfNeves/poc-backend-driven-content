import { z } from 'zod';

export const saveScreenBodySchema = z.object({
  name: z
    .string({ error: 'name is required' })
    .min(1, 'name cannot be empty')
    .max(100, 'name cannot exceed 100 characters'),
  config: z.looseObject({}),
  isActive: z.boolean().optional(),
});

export type SaveScreenBodyDTO = z.infer<typeof saveScreenBodySchema>;
