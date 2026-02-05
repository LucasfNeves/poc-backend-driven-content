import z from 'zod';
import { textComponentSchema } from './textComponentSchema';
import { imageComponentSchema } from './imageComponentSchema';
import { colorSchema, textAlignSchema } from './schemaBaseEnums';
import { iconButtonComponentSchema } from './iconButtonComponentSchema';

export const appBarComponentSchema = z.object({
  type: z.literal('appBar'),
  title: z.union([textComponentSchema, imageComponentSchema]).optional(),
  backgroundColor: colorSchema.optional(),
  foregroundColor: colorSchema.optional(),
  elevation: z.number().min(0, 'Elevation must be 0 or greater').optional(),
  centerTitle: z.boolean().optional(),
  leading: iconButtonComponentSchema.optional(),
  actions: z.array(iconButtonComponentSchema).optional(),
  shadowColor: colorSchema.optional(),
  surfaceTintColor: colorSchema.optional(),
  iconTheme: z
    .object({
      color: colorSchema.optional(),
      size: z.number().positive('Icon size must be a positive number').optional(),
      opacity: z
        .number()
        .min(0, 'Opacity must be between 0 and 1')
        .max(1, 'Opacity must be between 0 and 1')
        .optional(),
    })
    .optional(),
  actionsIconTheme: z
    .object({
      color: colorSchema.optional(),
      size: z.number().positive('Icon size must be a positive number').optional(),
      opacity: z
        .number()
        .min(0, 'Opacity must be between 0 and 1')
        .max(1, 'Opacity must be between 0 and 1')
        .optional(),
    })
    .optional(),
  toolbarHeight: z.number().positive('Toolbar height must be a positive number').optional(),
  leadingWidth: z.number().positive('Leading width must be a positive number').optional(),
  titleSpacing: z.number().min(0, 'Title spacing must be 0 or greater').optional(),
  titleTextAlign: textAlignSchema.optional(),
});

export type AppBarComponentSchema = z.infer<typeof appBarComponentSchema>;
