import z from 'zod';
import { textComponentSchema } from './textComponentSchema';
import { iconComponentSchema } from './iconComponentSchema';
import { iconButtonComponentSchema } from './iconButtonComponentSchema';
import { appBarComponentSchema } from './appBarComponentSchema';
import { scaffoldComponentSchema } from './scaffoldComponentSchema';

export const componentSchema = z.discriminatedUnion('type', [
  textComponentSchema,
  iconComponentSchema,
  iconButtonComponentSchema,
  appBarComponentSchema,
  scaffoldComponentSchema,
]);

export const validateComponent = (data: unknown) => {
  return componentSchema.parse(data);
};
