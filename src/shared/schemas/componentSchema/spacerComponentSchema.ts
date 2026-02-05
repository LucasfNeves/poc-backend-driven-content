import z from 'zod';

export const spacerComponentSchema = z.object({
  type: z.literal('spacer'),
  id: z.string().optional(),
});

export type SpacerComponentSchema = z.infer<typeof spacerComponentSchema>;
