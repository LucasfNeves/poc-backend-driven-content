import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { makeGetScreenByIdController } from '@/infrastructure/factories/screens-factories';

interface GetScreenByIdParams {
  id: string;
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
}
