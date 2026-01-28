import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import {
  makeDeleteComponentController,
  makeGetComponentByIdController,
  makeSaveComponentController,
  makeUpdateComponentController,
} from '@/infrastructure/factories/component-factories';

interface GetComponentByIdParams {
  id: string;
}

interface SaveComponentBody {
  name: string;
  component: Record<string, unknown>;
  isActive?: boolean;
}

interface UpdateComponentBody {
  name?: string;
  component?: Record<string, unknown>;
  isActive?: boolean;
}

export async function componentRoutes(fastify: FastifyInstance) {
  fastify.post<{ Body: SaveComponentBody }>(
    '/components',
    async (request: FastifyRequest<{ Body: SaveComponentBody }>, reply: FastifyReply) => {
      const controller = makeSaveComponentController();
      const response = await controller.handle({ body: request.body });
      return reply.status(response.statusCode).send(response.body);
    },
  );

  fastify.get<{ Params: GetComponentByIdParams }>(
    '/components/:id',
    async (request: FastifyRequest<{ Params: GetComponentByIdParams }>, reply: FastifyReply) => {
      const controller = makeGetComponentByIdController();
      const response = await controller.handle({ params: request.params });
      return reply.status(response.statusCode).send(response.body);
    },
  );

  fastify.put<{ Params: GetComponentByIdParams; Body: UpdateComponentBody }>(
    '/components/:id',
    async (
      request: FastifyRequest<{ Params: GetComponentByIdParams; Body: UpdateComponentBody }>,
      reply: FastifyReply,
    ) => {
      const controller = makeUpdateComponentController();
      const response = await controller.handle({ params: request.params, body: request.body });
      return reply.status(response.statusCode).send(response.body);
    },
  );

  fastify.delete<{ Params: GetComponentByIdParams }>(
    '/components/:id',
    async (request: FastifyRequest<{ Params: GetComponentByIdParams }>, reply: FastifyReply) => {
      const controller = makeDeleteComponentController();
      const response = await controller.handle({ params: request.params });
      return reply.status(response.statusCode).send(response.body);
    },
  );
}
