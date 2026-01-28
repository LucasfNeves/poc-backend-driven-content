import { IController, IRequest, IResponse } from '@/domain/interfaces/IController';
import { DeleteScreenUseCase } from '../use-cases/DeleteScreenUseCase';
import { validateIdSchema } from '@/domain/schemas/validateIdSchema';
import { ResponseHelper } from '@/shared/helpers/ResponseHelper';
import { NotFoundError } from '@/shared/errors/AppErrors';
import { ZodError } from 'zod';

export class DeleteScreenController implements IController<unknown, { id: string }> {
  constructor(private readonly deleteScreenUseCase: DeleteScreenUseCase) {}

  async handle(request: IRequest<unknown, { id: string }>): Promise<IResponse> {
    try {
      const { id } = validateIdSchema.parse(request.params);

      const deletedScreen = await this.deleteScreenUseCase.execute(id);

      return ResponseHelper.ok(deletedScreen);
    } catch (error) {
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
