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
  serverError,
};
