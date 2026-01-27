import { FastifyRequest } from 'fastify';

export interface GetScreenByIdParams {
  id: string;
}

export interface CreateScreenBody {
  name: string;
  config: Record<string, unknown>;
}

export interface UpdateScreenBody {
  name?: string;
  config?: Record<string, unknown>;
}

export interface GetScreenByIdRequest extends FastifyRequest {
  Params: GetScreenByIdParams;
}

export interface CreateScreenRequest extends FastifyRequest {
  Body: CreateScreenBody;
}

export interface UpdateScreenRequest extends FastifyRequest {
  Params: GetScreenByIdParams;
  Body: UpdateScreenBody;
}
