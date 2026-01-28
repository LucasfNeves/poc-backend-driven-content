import { z } from 'zod';

export const validateIdSchema = z.object({
  id: z.uuid({ error: 'id must be a valid UUID' }),
});

export type GetScreenByIdParamsDTO = z.infer<typeof validateIdSchema>;
