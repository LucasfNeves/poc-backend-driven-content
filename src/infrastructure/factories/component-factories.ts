import { DeleteComponentController } from '@/application/controller/DeleteComponentController';
import { GetComponentsController } from '@/application/controller/GetComponentsController';
import { SaveComponentController } from '@/application/controller/SaveComponentController';
import { UpdateComponentController } from '@/application/controller/UpdateComponentController';
import { DeleteComponentUseCase } from '@/application/use-cases/DeleteComponentUseCase';
import { GetComponentsUseCase } from '@/application/use-cases/GetComponentsUseCase';
import { SaveComponentUseCase } from '@/application/use-cases/SaveComponentUseCase';
import { UpdateComponentUseCase } from '@/application/use-cases/UpdateComponentUseCase';
import { ComponentRepository } from '@/infrastructure/repositories/postgres/ComponentRepository';
import { FastifyInstance } from 'fastify';

export const makeGetComponentsController = (): GetComponentsController => {
  const repository = new ComponentRepository();
  const useCase = new GetComponentsUseCase(repository);
  return new GetComponentsController(useCase);
};

export const makeSaveComponentController = (fastify?: FastifyInstance): SaveComponentController => {
  const repository = new ComponentRepository();
  const useCase = new SaveComponentUseCase(repository);
  const controller = new SaveComponentController(useCase);
  if (fastify) controller.fastify = fastify;
  return controller;
};

export const makeUpdateComponentController = (
  fastify?: FastifyInstance,
): UpdateComponentController => {
  const repository = new ComponentRepository();
  const useCase = new UpdateComponentUseCase(repository);
  const controller = new UpdateComponentController(useCase);
  if (fastify) controller.fastify = fastify;
  return controller;
};

export const makeDeleteComponentController = (
  fastify?: FastifyInstance,
): DeleteComponentController => {
  const repository = new ComponentRepository();
  const useCase = new DeleteComponentUseCase(repository);
  const controller = new DeleteComponentController(useCase);
  if (fastify) controller.fastify = fastify;
  return controller;
};
