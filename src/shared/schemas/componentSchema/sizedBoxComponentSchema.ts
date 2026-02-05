import z from 'zod';

export const sizedBoxComponentSchema = z.object({
  type: z.literal('sizedBox'),
  id: z.string().optional(),
  width: z.number().positive('Width must be a positive number').optional(),
  height: z.number().positive('Height must be a positive number').optional(),
});

export type SizedBoxComponentSchema = z.infer<typeof sizedBoxComponentSchema>;
