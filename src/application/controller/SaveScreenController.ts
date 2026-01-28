import { ZodError } from 'zod';
import { IController, IRequest, IResponse } from '@/domain/interfaces/IController';
import { ResponseHelper } from '@/shared/helpers/ResponseHelper';
import { SaveScreenUseCase } from '../use-cases/SaveScreenUseCase';
import {
  saveScreenBodySchema,
  SaveScreenBodyDTO,
} from '@/domain/schemas/saveScreenControllerSchema';
import { ConflictError, ValidationError } from '@/domain/errors';

export class SaveScreenController implements IController<SaveScreenBodyDTO> {
  constructor(private readonly saveScreenUseCase: SaveScreenUseCase) {}

  async handle(request: IRequest<SaveScreenBodyDTO>): Promise<IResponse> {
    try {
      const { name, config, isActive } = saveScreenBodySchema.parse(request.body);

      const screen = await this.saveScreenUseCase.execute({
        name,
        config,
        isActive,
      });

      return ResponseHelper.created(screen.toJSON());
    } catch (error) {
      if (error instanceof ZodError) {
        return ResponseHelper.fromZodError(error);
      }

      if (error instanceof ValidationError) {
        return ResponseHelper.badRequest(error.message);
      }

      if (error instanceof ConflictError) {
        return ResponseHelper.conflict(error.message);
      }

      return ResponseHelper.serverError(
        error instanceof Error ? error.message : 'Unexpected error',
      );
    }
  }
}
