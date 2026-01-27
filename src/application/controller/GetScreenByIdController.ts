import { IController, IRequest, IResponse } from '@/domain/interfaces/IController';
import { GetScreenByIdUseCase } from '@/application/use-cases/GetScreenByIdUseCase';
import { AppError } from '@/shared/errors/AppErrors';
import { ResponseHelper } from '@/shared/helpers/ResponseHelper';

export class GetScreenByIdController implements IController {
  constructor(private readonly getScreenByIdUseCase: GetScreenByIdUseCase) {}

  async handle(request: IRequest): Promise<IResponse> {
    try {
      const { id } = request.params;

      const screen = await this.getScreenByIdUseCase.execute(id!);

      return ResponseHelper.ok(screen.toJSON());
    } catch (error) {
      if (error instanceof AppError) {
        return error.toResponse();
      }

      return ResponseHelper.serverError();
    }
  }
}
