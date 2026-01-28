import z from 'zod';

export const iconComponentSchema = z.object({
  type: z.literal('icon'),
  id: z.string().optional(),
  iconType: z.enum(['material', 'cupertino']).optional(),
  icon: z.string(),
  size: z.number().optional(),
  color: z.string().optional(),
});
