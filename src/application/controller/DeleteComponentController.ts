import { DeleteComponentUseCase } from '@/application/use-cases/DeleteComponentUseCase';
import { ResponseHelper } from '@/shared/helpers/ResponseHelper';
import { AppError } from '@/shared/errors/AppErrors';
import { IResponse } from '@/domain/interfaces/IController';

interface DeleteComponentRequest {
  params: { id: string };
}

export class DeleteComponentController {
  constructor(private readonly useCase: DeleteComponentUseCase) {}

  async handle(request: DeleteComponentRequest): Promise<IResponse> {
    try {
      const result = await this.useCase.execute(request.params.id);
      return ResponseHelper.ok(result);
    } catch (error) {
      if (error instanceof AppError) {
        return error.toResponse();
      }
      return ResponseHelper.serverError(error instanceof Error ? error.message : 'Unknown error');
    }
  }
}
