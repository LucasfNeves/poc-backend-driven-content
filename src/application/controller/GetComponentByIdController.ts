import { GetComponentByIdUseCase } from '@/application/use-cases/GetComponentByIdUseCase';
import { ResponseHelper } from '@/shared/helpers/ResponseHelper';
import { AppError } from '@/shared/errors/AppErrors';
import { IResponse } from '@/domain/interfaces/IController';

interface GetComponentByIdRequest {
  params: { id: string };
}

export class GetComponentByIdController {
  constructor(private readonly useCase: GetComponentByIdUseCase) {}

  async handle(request: GetComponentByIdRequest): Promise<IResponse> {
    try {
      const component = await this.useCase.execute(request.params.id);
      return ResponseHelper.ok(component.toJSON());
    } catch (error) {
      if (error instanceof AppError) {
        return error.toResponse();
      }
      return ResponseHelper.serverError(error instanceof Error ? error.message : 'Unknown error');
    }
  }
}
