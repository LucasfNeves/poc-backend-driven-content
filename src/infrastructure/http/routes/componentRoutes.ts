import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import {
  makeDeleteComponentController,
  makeGetComponentsController,
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

interface UpdateComponentParams {
  name: string;
}

interface UpdateComponentBody {
  component: Record<string, unknown>;
}

export async function componentRoutes(fastify: FastifyInstance) {
  fastify.post<{ Body: SaveComponentBody }>(
    '/',
    async (request: FastifyRequest<{ Body: SaveComponentBody }>, reply: FastifyReply) => {
      const controller = makeSaveComponentController(fastify);
      const response = await controller.handle({ body: request.body });
      return reply.status(response.statusCode).send(response.body);
    },
  );

  fastify.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
    const controller = makeGetComponentsController();
    const response = await controller.handle({ query: request.query });
    return reply.status(response.statusCode).send(response.body);
  });

  fastify.put<{ Params: UpdateComponentParams; Body: UpdateComponentBody }>(
    '/:name',
    async (
      request: FastifyRequest<{ Params: UpdateComponentParams; Body: UpdateComponentBody }>,
      reply: FastifyReply,
    ) => {
      const controller = makeUpdateComponentController(fastify);
      const response = await controller.handle({ params: request.params, body: request.body });
      return reply.status(response.statusCode).send(response.body);
    },
  );

  fastify.delete<{ Params: GetComponentByIdParams }>(
    '/:id',
    async (request: FastifyRequest<{ Params: GetComponentByIdParams }>, reply: FastifyReply) => {
      const controller = makeDeleteComponentController(fastify);
      const response = await controller.handle({ params: request.params });
      return reply.status(response.statusCode).send(response.body);
    },
  );
}
