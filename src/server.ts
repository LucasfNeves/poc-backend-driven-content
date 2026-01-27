import 'dotenv/config';
import Fastify from 'fastify';
import { screenRoutes } from '@/infrastructure/http/routes/screenRoutes';
import { globalErrorHandler } from '@/infrastructure/http/middlewares/errorHandler';

const isDevelopment = process.env.NODE_ENV === 'development';

const fastify = Fastify({
  logger: isDevelopment
    ? {
        transport: {
          target: 'pino-pretty',
          options: {
            translateTime: 'HH:MM:ss',
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
    await fastify.register(screenRoutes);

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
