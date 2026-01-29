import 'fastify';
import { ComponentMetadata } from '@/domain/entities/Component';

declare module 'fastify' {
  interface FastifyInstance {
    notifyComponentCreated?: (name: string, data: ComponentMetadata) => void;
    notifyComponentUpdated?: (name: string, data: ComponentMetadata) => void;
    notifyComponentDeleted?: (name: string) => void;
  }
}
