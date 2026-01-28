import { DeleteComponentController } from '@/application/controller/DeleteComponentController';
import { GetComponentByIdController } from '@/application/controller/GetComponentByIdController';
import { SaveComponentController } from '@/application/controller/SaveComponentController';
import { UpdateComponentController } from '@/application/controller/UpdateComponentController';
import { DeleteComponentUseCase } from '@/application/use-cases/DeleteComponentUseCase';
import { GetComponentByIdUseCase } from '@/application/use-cases/GetComponentByIdUseCase';
import { SaveComponentUseCase } from '@/application/use-cases/SaveComponentUseCase';
import { UpdateComponentUseCase } from '@/application/use-cases/UpdateComponentUseCase';
import { ComponentRepository } from '@/infrastructure/repositories/postgres/ComponentRepository';
import { JsonStorageService } from '@/infrastructure/services/JsonStorageService';

export const makeGetComponentByIdController = (): GetComponentByIdController => {
  const repository = new ComponentRepository();
  const useCase = new GetComponentByIdUseCase(repository);
  return new GetComponentByIdController(useCase);
};

export const makeSaveComponentController = (): SaveComponentController => {
  const repository = new ComponentRepository();
  const jsonStorage = new JsonStorageService();
  const useCase = new SaveComponentUseCase(repository, jsonStorage);
  return new SaveComponentController(useCase);
};

export const makeUpdateComponentController = (): UpdateComponentController => {
  const repository = new ComponentRepository();
  const jsonStorage = new JsonStorageService();
  const useCase = new UpdateComponentUseCase(repository, jsonStorage);
  return new UpdateComponentController(useCase);
};

export const makeDeleteComponentController = (): DeleteComponentController => {
  const repository = new ComponentRepository();
  const jsonStorage = new JsonStorageService();
  const useCase = new DeleteComponentUseCase(repository, jsonStorage);
  return new DeleteComponentController(useCase);
};
