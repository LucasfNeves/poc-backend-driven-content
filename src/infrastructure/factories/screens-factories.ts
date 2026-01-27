import { GetScreenByIdController } from '@/application/controller/GetScreenByIdController';
import { GetScreenByIdUseCase } from '@/application/use-cases/GetScreenByIdUseCase';
import { ScreenRepository } from '@/infrastructure/repositories/postgres/ScreenRepository';

export const makeGetScreenByIdController = (): GetScreenByIdController => {
  const screenRepository = new ScreenRepository();
  const getScreenByIdUseCase = new GetScreenByIdUseCase(screenRepository);
  const controller = new GetScreenByIdController(getScreenByIdUseCase);

  return controller;
};
