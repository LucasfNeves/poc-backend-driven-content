import { IController, IRequest, IResponse } from '@/domain/interfaces/IController';
import { ResponseHelper } from '@/shared/helpers/ResponseHelper';
import { SaveScreenUseCase } from '../use-cases/SaveScreenUseCase';
import { ScreenConfig } from '@/domain/entities/Screen';

interface SaveScreenBody {
  name: string;
  config: ScreenConfig;
  isActive?: boolean;
}

export class SaveScreenController implements IController<SaveScreenBody> {
  constructor(private readonly saveScreenUseCase: SaveScreenUseCase) {}

  async handle(request: IRequest<SaveScreenBody>): Promise<IResponse> {
    if (!request.body) {
      return ResponseHelper.serverError('Request body is missing');
    }

    const { name, config, isActive } = request.body;

    const screen = await this.saveScreenUseCase.execute({ name, config, isActive });

    return ResponseHelper.created(screen.toJSON());
  }
}
