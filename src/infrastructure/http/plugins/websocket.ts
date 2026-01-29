import fp from 'fastify-plugin';
import websocket from '@fastify/websocket';
import { FastifyPluginAsync } from 'fastify';
import { ComponentMetadata } from '@/domain/entities/Component';
import { WebSocket } from 'ws';

interface WebSocketMessage {
  type: 'component-created' | 'component-updated' | 'component-deleted';
  componentName: string;
  componentData?: ComponentMetadata;
  timestamp: string;
}

const websocketPlugin: FastifyPluginAsync = async (fastify) => {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  await fastify.register(websocket);

  const connections = new Set<WebSocket>();

  fastify.get('/ws/live-preview', { websocket: true }, (socket) => {
    connections.add(socket);

    socket.send(
      JSON.stringify({
        type: 'connected',
        message: 'Live preview connected',
      }),
    );

    socket.on('close', () => {
      connections.delete(socket);
    });
  });

  function broadcast(message: WebSocketMessage) {
    const payload = JSON.stringify(message);
    connections.forEach((socket) => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(payload);
      }
    });
  }

  fastify.decorate('notifyComponentCreated', (name: string, data: ComponentMetadata) => {
    broadcast({
      type: 'component-created',
      componentName: name,
      componentData: data,
      timestamp: new Date().toISOString(),
    });
  });

  fastify.decorate('notifyComponentUpdated', (name: string, data: ComponentMetadata) => {
    broadcast({
      type: 'component-updated',
      componentName: name,
      componentData: data,
      timestamp: new Date().toISOString(),
    });
  });

  fastify.decorate('notifyComponentDeleted', (name: string) => {
    broadcast({
      type: 'component-deleted',
      componentName: name,
      timestamp: new Date().toISOString(),
    });
  });
};

export default fp(websocketPlugin);
