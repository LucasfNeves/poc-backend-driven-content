import z from 'zod';

export const edgeInsetsSchema = z.object({
  top: z.number().min(0, 'Top padding must be 0 or greater').optional(),
  left: z.number().min(0, 'Left padding must be 0 or greater').optional(),
  right: z.number().min(0, 'Right padding must be 0 or greater').optional(),
  bottom: z.number().min(0, 'Bottom padding must be 0 or greater').optional(),
});

export type EdgeInsetsSchema = z.infer<typeof edgeInsetsSchema>;
