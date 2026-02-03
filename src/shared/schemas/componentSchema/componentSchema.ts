import z from 'zod';
import { textComponentSchema } from './textComponentSchema';
import { iconComponentSchema } from './iconComponentSchema';
import { imageComponentSchema } from './imageComponentSchema';
import { iconButtonComponentSchema } from './iconButtonComponentSchema';
import { appBarComponentSchema } from './appBarComponentSchema';

export const componentSchema = z.discriminatedUnion('type', [
  textComponentSchema,
  iconComponentSchema,
  imageComponentSchema,
  iconButtonComponentSchema,
  appBarComponentSchema,
]);

export type ValidatedComponent = z.infer<typeof componentSchema>;
