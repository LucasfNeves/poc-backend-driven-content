import z from 'zod';
import { textComponentSchema } from './textComponentSchema';
import { imageComponentSchema } from './imageComponentSchema';
import { iconButtonComponentSchema } from './iconButtonComponentSchema';

const iconThemeSchema = z
  .object({
    color: z.string().optional(),
    size: z.number().optional(),
    opacity: z.number().optional(),
  })
  .optional();

export const appBarComponentSchema = z.object({
  type: z.literal('appBar'),
  id: z.string().optional(),
  title: z.union([textComponentSchema, imageComponentSchema]).optional(),
  backgroundColor: z.string().optional(),
  foregroundColor: z.string().optional(),
  elevation: z.number().optional(),
  centerTitle: z.boolean().optional(),
  leading: iconButtonComponentSchema.optional(),
  actions: z.array(iconButtonComponentSchema).optional(),
  shadowColor: z.string().optional(),
  surfaceTintColor: z.string().optional(),
  iconTheme: iconThemeSchema,
  actionsIconTheme: iconThemeSchema,
  toolbarHeight: z.number().optional(),
  leadingWidth: z.number().optional(),
  titleSpacing: z.number().optional(),
  titleTextAlign: z.enum(['left', 'right', 'center', 'justify', 'start', 'end']).optional(),
});
