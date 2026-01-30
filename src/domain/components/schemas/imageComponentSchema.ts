import z from 'zod';

export const imageComponentSchema = z.object({
  type: z.literal('image'),
  id: z.string().optional(),
  src: z.string(),
  width: z.number().optional(),
  height: z.number().optional(),
  fit: z
    .enum(['contain', 'cover', 'fill', 'fitWidth', 'fitHeight', 'none', 'scaleDown'])
    .optional(),
});
