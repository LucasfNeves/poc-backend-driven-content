import { ZodError } from 'zod';
import { IController, IRequest, IResponse } from '@/domain/interfaces/IController';
import { GetScreenByIdUseCase } from '@/application/use-cases/GetScreenByIdUseCase';
import { ResponseHelper } from '@/shared/helpers/ResponseHelper';
import { validateIdSchema, GetScreenByIdParamsDTO } from '@/domain/schemas/validateIdSchema';
import { NotFoundError } from '@/shared/errors/AppErrors';
export class GetScreenByIdController implements IController<unknown, GetScreenByIdParamsDTO> {
  constructor(private readonly getScreenByIdUseCase: GetScreenByIdUseCase) {}

  async handle(request: IRequest<unknown, GetScreenByIdParamsDTO>): Promise<IResponse> {
    try {
      const { id } = validateIdSchema.parse(request.params);

      const screen = await this.getScreenByIdUseCase.execute(id);

      return ResponseHelper.ok(screen.toJSON());
    } catch (error) {
      console.error(error);
      if (error instanceof ZodError) {
        return ResponseHelper.fromZodError(error);
      }

      if (error instanceof NotFoundError) {
        return ResponseHelper.notFound(error.message);
      }

      return ResponseHelper.serverError('An unexpected error occurred.');
    }
  }
}
