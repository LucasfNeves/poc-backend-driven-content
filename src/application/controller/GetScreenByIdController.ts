import { IController, IRequest, IResponse } from '@/domain/interfaces/IController';
import { GetScreenByIdUseCase } from '@/application/use-cases/GetScreenByIdUseCase';
import { ResponseHelper } from '@/shared/helpers/ResponseHelper';

interface GetScreenByIdParams {
  id: string;
}

export class GetScreenByIdController implements IController<unknown, GetScreenByIdParams> {
  constructor(private readonly getScreenByIdUseCase: GetScreenByIdUseCase) {}

  async handle(request: IRequest<unknown, GetScreenByIdParams>): Promise<IResponse> {
    if (!request.params || !request.params.id) {
      return ResponseHelper.serverError('Screen ID parameter is missing');
    }

    const { id } = request.params;

    const screen = await this.getScreenByIdUseCase.execute(id);

    return ResponseHelper.ok(screen.toJSON());
  }
}
