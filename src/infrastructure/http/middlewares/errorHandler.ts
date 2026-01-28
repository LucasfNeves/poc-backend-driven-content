import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import { ZodError } from 'zod';
import { AppError } from '@/shared/errors/AppErrors';
import {
  DomainError,
  ValidationError as DomainValidationError,
  NotFoundError as DomainNotFoundError,
  ConflictError as DomainConflictError,
  UnauthorizedError as DomainUnauthorizedError,
  ForbiddenError as DomainForbiddenError,
} from '@/domain/errors';

function getDomainErrorStatusCode(error: DomainError): number {
  if (error instanceof DomainValidationError) return 400;
  if (error instanceof DomainNotFoundError) return 404;
  if (error instanceof DomainConflictError) return 409;
  if (error instanceof DomainUnauthorizedError) return 401;
  if (error instanceof DomainForbiddenError) return 403;
  return 400;
}

export async function globalErrorHandler(
  error: FastifyError | Error,
  request: FastifyRequest,
  reply: FastifyReply,
) {
  request.log.error(error);

  if (error instanceof ZodError) {
    const errors = error.issues.map((issue) => ({
      field: issue.path.join('.'),
      message: issue.message,
    }));
    return reply.status(400).send({
      error: 'Validation Error',
      errors,
    });
  }

  if (error instanceof AppError) {
    return reply.status(error.statusCode).send({
      error: error.name,
      message: error.message,
    });
  }

  if (error instanceof DomainError) {
    const statusCode = getDomainErrorStatusCode(error);
    return reply.status(statusCode).send({
      error: error.name,
      message: error.message,
    });
  }

  if ('validation' in error && error.validation) {
    return reply.status(400).send({
      error: 'Validation Error',
      message: error.message,
      details: error.validation,
    });
  }

  if ('statusCode' in error && error.statusCode) {
    return reply.status(error.statusCode).send({
      error: error.name,
      message: error.message,
    });
  }

  return reply.status(500).send({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'production' ? 'An unexpected error occurred' : error.message,
  });
}
