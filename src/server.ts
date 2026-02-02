import 'dotenv/config';
import Fastify from 'fastify';
import cors from '@fastify/cors';
import { globalErrorHandler } from '@/infrastructure/http/middlewares/errorHandler';
import websocketPlugin from '@/infrastructure/http/plugins/websocket';
import routesPlugin from '@/infrastructure/http/plugins/routes';

const isDevelopment = process.env.NODE_ENV === 'development';

const fastify = Fastify({
  logger: isDevelopment
    ? {
        transport: {
          target: 'pino-pretty',
          options: {
            translateTime: 'HH:mm:ss',
            ignore: 'pid,hostname',
            colorize: true,
            singleLine: true,
          },
        },
      }
    : true,
});

fastify.setErrorHandler(globalErrorHandler);

fastify.get('/health', async () => {
  return { status: 'ok' };
});

const start = async () => {
  try {
    await fastify.register(cors, {
      origin: true,
      credentials: true,
    });

    await fastify.register(routesPlugin);

    if (isDevelopment) {
      await fastify.register(websocketPlugin);
      fastify.log.info('Hot-reload WebSocket enabled at ws://localhost:3000/ws/live-preview');
    }

    const port = Number(process.env.PORT || process.env.API_PORT) || 3000;
    await fastify.listen({
      port,
      host: '0.0.0.0',
    });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
