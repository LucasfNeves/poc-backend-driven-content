import { ZodError } from 'zod';
import { IResponse } from '@/domain/interfaces/IController';

export const ok = <T>(body: T): IResponse => {
  return {
    statusCode: 200,
    body: body as Record<string, unknown>,
  };
};

export const created = <T>(body: T): IResponse => {
  return {
    statusCode: 201,
    body: body as Record<string, unknown>,
  };
};

export const noContent = (): IResponse => {
  return {
    statusCode: 204,
    body: {},
  };
};

export const badRequest = (message: string): IResponse => {
  return {
    statusCode: 400,
    body: {
      error: 'Bad Request',
      message,
    },
  };
};

export const validationError = (errors: Array<{ field: string; message: string }>): IResponse => {
  return {
    statusCode: 400,
    body: {
      error: 'Validation Error',
      errors,
    },
  };
};

export const fromZodError = (error: ZodError): IResponse => {
  const firstIssue = error.issues[0];
  const field = String(firstIssue?.path[firstIssue.path.length - 1] || firstIssue?.path.join('.'));
  let message = firstIssue?.message?.replace(/\\/g, '').replace(/"/g, "'") || 'Invalid value';

  if (message.includes('received undefined')) {
    message = 'is required';
  } else if (message.includes('Invalid input')) {
    message = message.replace('Invalid input: ', '');
  } else if (message.includes('Invalid string')) {
    message = message.replace('Invalid string: ', '');
  }

  return {
    statusCode: 400,
    body: {
      error: 'ValidationError',
      message: `${field} ${message}`,
    },
  };
};

export const notFound = (message: string): IResponse => {
  return {
    statusCode: 404,
    body: {
      error: 'Not Found',
      message,
    },
  };
};

export const unauthorized = (message: string = 'Unauthorized'): IResponse => {
  return {
    statusCode: 401,
    body: {
      error: 'Unauthorized',
      message,
    },
  };
};

export const forbidden = (message: string = 'Forbidden'): IResponse => {
  return {
    statusCode: 403,
    body: {
      error: 'Forbidden',
      message,
    },
  };
};

export const conflict = (message: string): IResponse => {
  return {
    statusCode: 409,
    body: {
      error: 'Conflict',
      message,
    },
  };
};

export const serverError = (message: string = 'An unexpected error occurred'): IResponse => {
  return {
    statusCode: 500,
    body: {
      error: 'Internal Server Error',
      message,
    },
  };
};

export const ResponseHelper = {
  ok,
  created,
  noContent,
  badRequest,
  validationError,
  fromZodError,
  notFound,
  unauthorized,
  forbidden,
  conflict,
  serverError,
};
