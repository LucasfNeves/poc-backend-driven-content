import { ZodError } from 'zod';
import { IController, IRequest, IResponse } from '@/domain/interfaces/IController';
import { GetScreenByIdUseCase } from '@/application/use-cases/GetScreenByIdUseCase';
import { ResponseHelper } from '@/shared/helpers/ResponseHelper';
import {
  getScreenByIdParamsSchema,
  GetScreenByIdParamsDTO,
} from '@/domain/schemas/GetScreenByIdSchema';
import { NotFoundError } from '@/domain/errors';

export class GetScreenByIdController implements IController<unknown, GetScreenByIdParamsDTO> {
  constructor(private readonly getScreenByIdUseCase: GetScreenByIdUseCase) {}

  async handle(request: IRequest<unknown, GetScreenByIdParamsDTO>): Promise<IResponse> {
    try {
      const { id } = getScreenByIdParamsSchema.parse(request.params);

      const screen = await this.getScreenByIdUseCase.execute(id);

      return ResponseHelper.ok(screen.toJSON());
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.issues.map((issue) => ({
          field: issue.path.join('.'),
          message: issue.message,
        }));
        return ResponseHelper.validationError(errors);
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
