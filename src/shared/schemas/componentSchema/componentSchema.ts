import z from 'zod';
import { textComponentSchema } from './textComponentSchema';
import { iconComponentSchema } from './iconComponentSchema';
import { imageComponentSchema } from './imageComponentSchema';
import { iconButtonComponentSchema } from './iconButtonComponentSchema';
import { appBarComponentSchema } from './appBarComponentSchema';
import { sizedBoxComponentSchema } from './sizedBoxComponentSchema';
import { spacerComponentSchema } from './spacerComponentSchema';
import { columnComponentSchema } from './columnComponentSchema';
import { rowComponentSchema } from './rowComponentSchema';
import { containerComponentSchema } from './containerComponentSchema';
import { paddingComponentSchema } from './paddingComponentSchema';
import { scaffoldComponentSchema } from './scaffoldComponentSchema';

export const componentSchema: z.ZodTypeAny = z.discriminatedUnion('type', [
  textComponentSchema,
  iconComponentSchema,
  imageComponentSchema,
  iconButtonComponentSchema,
  appBarComponentSchema,
  sizedBoxComponentSchema,
  spacerComponentSchema,
  columnComponentSchema,
  rowComponentSchema,
  containerComponentSchema,
  paddingComponentSchema,
  scaffoldComponentSchema,
]);

export type ValidatedComponent = z.infer<typeof componentSchema>;
