import { UpdateComponentUseCase } from '@/application/use-cases/UpdateComponentUseCase';
import { ResponseHelper } from '@/shared/helpers/ResponseHelper';
import { AppError } from '@/shared/errors/AppErrors';
import { IResponse } from '@/domain/interfaces/IController';
import { ZodError } from 'zod';

interface UpdateComponentRequest {
  params: { id: string };
  body: {
    name?: string;
    component?: Record<string, unknown>;
    isActive?: boolean;
  };
}

export class UpdateComponentController {
  constructor(private readonly useCase: UpdateComponentUseCase) {}

  async handle(request: UpdateComponentRequest): Promise<IResponse> {
    try {
      const component = await this.useCase.execute(request.params.id, request.body);
      return ResponseHelper.ok(component.toJSON());
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
