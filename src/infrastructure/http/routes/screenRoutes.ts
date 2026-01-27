import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import {
  makeGetScreenByIdController,
  makeSaveScreenController,
} from '@/infrastructure/factories/screens-factories';

interface GetScreenByIdParams {
  id: string;
}

interface SaveScreenBody {
  name: string;
  config: Record<string, unknown>;
  isActive?: boolean;
}

export async function screenRoutes(fastify: FastifyInstance) {
  fastify.get<{ Params: GetScreenByIdParams }>(
    '/screens/:id',
    async (request: FastifyRequest<{ Params: GetScreenByIdParams }>, reply: FastifyReply) => {
      const controller = makeGetScreenByIdController();

      const response = await controller.handle({
        params: request.params,
      });

      return reply.status(response.statusCode).send(response.body);
    },
  );

  fastify.post<{ Body: SaveScreenBody }>(
    '/screens',
    async (request: FastifyRequest<{ Body: SaveScreenBody }>, reply: FastifyReply) => {
      const controller = makeSaveScreenController();

      const response = await controller.handle({
        body: request.body,
      });

      return reply.status(response.statusCode).send(response.body);
    },
  );
}
