import z from 'zod';

export const saveComponentRequestSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(1, 'Name is required')
      .max(100, 'Name must be at most 100 characters')
      .regex(
        /^[a-zA-Z0-9_-]+$/,
        'Name must contain only letters, numbers, hyphens and underscores',
      ),
    component: z
      .object({
        type: z.string().min(1, 'Component type is required'),
      })
      .catchall(z.unknown()),
    isActive: z.boolean().optional(),
  }),
});

export type SaveComponentRequest = z.infer<typeof saveComponentRequestSchema>;
