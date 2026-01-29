import { UpdateComponentUseCase } from '@/application/use-cases/UpdateComponentUseCase';
import { ResponseHelper } from '@/shared/helpers/ResponseHelper';
import { AppError } from '@/shared/errors/AppErrors';
import { IResponse } from '@/domain/interfaces/IController';
import { ZodError } from 'zod';
import { updateComponentRequestSchema } from './schemas/updateComponentRequestSchema';
import { FastifyInstance } from 'fastify';

export class UpdateComponentController {
  public fastify?: FastifyInstance;

  constructor(private readonly useCase: UpdateComponentUseCase) {}

  async handle(request: unknown): Promise<IResponse> {
    try {
      const { params, body } = updateComponentRequestSchema.parse(request);
      const { name } = params;
      const { component: componentData } = body;

      const component = await this.useCase.execute(name, componentData);

      this.fastify?.notifyComponentUpdated?.(name, component.toJSON());

      return ResponseHelper.ok(component.toJSON());
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
