import { SaveComponentUseCase } from '@/application/use-cases/SaveComponentUseCase';
import { ResponseHelper } from '@/shared/helpers/ResponseHelper';
import { AppError } from '@/shared/errors/AppErrors';
import { IResponse } from '@/domain/interfaces/IController';
import { ZodError } from 'zod';

interface SaveComponentRequest {
  body: {
    name: string;
    component: Record<string, unknown>;
    isActive?: boolean;
  };
}

export class SaveComponentController {
  constructor(private readonly useCase: SaveComponentUseCase) {}

  async handle(request: SaveComponentRequest): Promise<IResponse> {
    try {
      const component = await this.useCase.execute(
        request.body.name,
        request.body.component,
        request.body.isActive,
      );

      return ResponseHelper.created(component.toJSON());
    } catch (error) {
      if (error instanceof ZodError) {
        return ResponseHelper.fromZodError(error);
      }
      if (error instanceof AppError) {
        return error.toResponse();
      }
      return ResponseHelper.serverError(error instanceof Error ? error.message : 'Unknown error');
    }
  }
}
