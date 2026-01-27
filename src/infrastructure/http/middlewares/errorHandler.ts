import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import { AppError } from '@/shared/errors/AppErrors';

export async function globalErrorHandler(
  error: FastifyError | Error,
  request: FastifyRequest,
  reply: FastifyReply,
) {
  request.log.error(error);

  if (error instanceof AppError) {
    return reply.status(error.statusCode).send({
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
