import { DeleteScreenController } from '@/application/controller/DeleteScreenController';
import { GetScreenByIdController } from '@/application/controller/GetScreenByIdController';
import { SaveScreenController } from '@/application/controller/SaveScreenController';
import { DeleteScreenUseCase } from '@/application/use-cases/DeleteScreenUseCase';
import { GetScreenByIdUseCase } from '@/application/use-cases/GetScreenByIdUseCase';
import { SaveScreenUseCase } from '@/application/use-cases/SaveScreenUseCase';
import { ScreenRepository } from '@/infrastructure/repositories/postgres/ScreenRepository';

export const makeGetScreenByIdController = (): GetScreenByIdController => {
  const screenRepository = new ScreenRepository();
  const getScreenByIdUseCase = new GetScreenByIdUseCase(screenRepository);
  const controller = new GetScreenByIdController(getScreenByIdUseCase);

  return controller;
};

export const makeSaveScreenController = (): SaveScreenController => {
  const screenRepository = new ScreenRepository();
  const saveScreenUseCase = new SaveScreenUseCase(screenRepository);
  const controller = new SaveScreenController(saveScreenUseCase);

  return controller;
};

export const makeDeleteScreenController = (): DeleteScreenController => {
  const screenRepository = new ScreenRepository();
  const deleteScreenUseCase = new DeleteScreenUseCase(screenRepository);
  const controller = new DeleteScreenController(deleteScreenUseCase);

  return controller;
};
