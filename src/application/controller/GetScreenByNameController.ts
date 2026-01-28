import { ZodError } from 'zod';
import { IController, IRequest, IResponse } from '@/domain/interfaces/IController';
import { GetScreenByName } from '../use-cases/GetScreenByName';
import { ResponseHelper } from '@/shared/helpers/ResponseHelper';
import {
  getScreenByNameParamsSchema,
  GetScreenByNameParamsDTO,
} from '@/domain/schemas/GetScreenByNameSchema';
import { NotFoundError } from '@/domain/errors';

export class GetScreenByNameController implements IController<unknown, GetScreenByNameParamsDTO> {
  constructor(private readonly getScreenByNameUseCase: GetScreenByName) {}

  async handle(request: IRequest<unknown, GetScreenByNameParamsDTO>): Promise<IResponse> {
    try {
      const { name } = getScreenByNameParamsSchema.parse(request.params);

      const screen = await this.getScreenByNameUseCase.execute(name);

      return ResponseHelper.ok(screen.toJSON());
    } catch (error) {
      if (error instanceof ZodError) {
        return ResponseHelper.fromZodError(error);
      }

      if (error instanceof NotFoundError) {
        return ResponseHelper.notFound(error.message);
      }

      return ResponseHelper.serverError(
        error instanceof Error ? error.message : 'Unexpected error',
      );
    }
  }
}
