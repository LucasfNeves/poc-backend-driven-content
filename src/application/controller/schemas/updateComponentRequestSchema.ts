import z from 'zod';

export const updateComponentRequestSchema = z.object({
  params: z.object({
    name: z.string().min(1, 'Name is required'),
  }),
  body: z.object({
    component: z
      .object({
        type: z.string().min(1, 'Component type is required'),
      })
      .catchall(z.unknown()),
  }),
});

export type UpdateComponentRequest = z.infer<typeof updateComponentRequestSchema>;
