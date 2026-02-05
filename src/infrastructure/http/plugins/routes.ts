import fp from 'fastify-plugin';
import { FastifyPluginAsync } from 'fastify';
import { componentRoutes } from '../routes/componentRoutes';

const routesPlugin: FastifyPluginAsync = async (fastify) => {
  await fastify.register(componentRoutes, { prefix: '/api/components' });
};

export default fp(routesPlugin);
