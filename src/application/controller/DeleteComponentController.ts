import { DeleteComponentUseCase } from '@/application/use-cases/DeleteComponentUseCase';
import { ResponseHelper } from '@/shared/helpers/ResponseHelper';
import { AppError } from '@/shared/errors/AppErrors';
import { IResponse } from '@/domain/interfaces/IController';
import { ZodError } from 'zod';
import { FastifyInstance } from 'fastify';
import { deleteComponentRequestSchema } from '@/shared/schemas/controllerSchema/deleteComponentRequestSchema';

export class DeleteComponentController {
  public fastify?: FastifyInstance;

  constructor(private readonly useCase: DeleteComponentUseCase) {}

  async handle(request: unknown): Promise<IResponse> {
    try {
      const { params } = deleteComponentRequestSchema.parse(request);
      const { id } = params;

      const result = await this.useCase.execute(id);

      this.fastify?.notifyComponentDeleted?.(result.name);

      return ResponseHelper.ok(result);
    } catch (error) {
      if (error instanceof ZodError) {
        return ResponseHelper.fromZodError(error);
      }
      if (error instanceof AppError) {
        return error.toResponse();
      }
      return ResponseHelper.serverError(error instanceof Error ? error.message : 'Unknown error');
    }
  }
}
