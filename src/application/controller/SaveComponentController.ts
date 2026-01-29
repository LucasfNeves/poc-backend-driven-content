import { SaveComponentUseCase } from '@/application/use-cases/SaveComponentUseCase';
import { ResponseHelper } from '@/shared/helpers/ResponseHelper';
import { AppError } from '@/shared/errors/AppErrors';
import { IResponse } from '@/domain/interfaces/IController';
import { ZodError } from 'zod';
import { saveComponentRequestSchema } from './schemas/saveComponentRequestSchema';
import { FastifyInstance } from 'fastify';

export class SaveComponentController {
  public fastify?: FastifyInstance;

  constructor(private readonly saveComponentUseCase: SaveComponentUseCase) {}

  async handle(request: unknown): Promise<IResponse> {
    try {
      const { body } = saveComponentRequestSchema.parse(request);
      const { name, component: componentData } = body;

      const component = await this.saveComponentUseCase.execute(name, componentData);

      this.fastify?.notifyComponentCreated?.(name, component.toJSON());

      return ResponseHelper.created(component.toJSON());
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
