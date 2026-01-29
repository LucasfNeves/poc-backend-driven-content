import z from 'zod';

export const textComponentSchema = z.object({
  type: z.literal('text'),
  id: z.string().optional(),
  data: z.string(),
  style: z
    .object({
      fontSize: z.number().optional(),
      fontWeight: z.string().optional(),
      color: z.string().optional(),
      height: z.number().optional(),
    })
    .optional(),
});
