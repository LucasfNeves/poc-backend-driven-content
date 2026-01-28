import { z } from 'zod';

export const getScreenByIdParamsSchema = z.object({
  id: z.uuid({ error: 'id must be a valid UUID' }),
});

export type GetScreenByIdParamsDTO = z.infer<typeof getScreenByIdParamsSchema>;
