import z from 'zod';

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const NAME_REGEX = /^[a-z0-9_-]+$/i;

export const uuidSchema = z
  .string()
  .refine((val) => UUID_REGEX.test(val), { message: 'ID must be a valid UUID format' });

export const nameSchema = z
  .string()
  .min(1, 'Name cannot be empty')
  .max(100, 'Name must be at most 100 characters')
  .regex(NAME_REGEX, 'Name must contain only letters, numbers, hyphens and underscores');
