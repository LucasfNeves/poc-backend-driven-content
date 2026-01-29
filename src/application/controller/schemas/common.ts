import z from 'zod';

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const NAME_REGEX = /^[a-z0-9_-]+$/i;

export const uuidSchema = z
  .string()
  .refine((val) => UUID_REGEX.test(val), { message: 'Invalid UUID format' });

export const nameSchema = z
  .string()
  .regex(NAME_REGEX, 'Name must contain only letters, numbers, hyphens and underscores');
