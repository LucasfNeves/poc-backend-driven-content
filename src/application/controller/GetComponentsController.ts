import { GetComponentsUseCase } from '@/application/use-cases/GetComponentsUseCase';
import { ResponseHelper } from '@/shared/helpers/ResponseHelper';
import { AppError } from '@/shared/errors/AppErrors';
import { IResponse } from '@/domain/interfaces/IController';
import { Component } from '@/domain/entities/Component';
import { ZodError } from 'zod';
import { getComponentsRequestSchema } from '@/shared/schemas/controllerSchema/getComponentsRequestSchema';

export class GetComponentsController {
  constructor(private readonly useCase: GetComponentsUseCase) {}

  async handle(request: unknown): Promise<IResponse> {
    try {
      const { query } = getComponentsRequestSchema.parse(request);

      const result = (await this.useCase.execute(query)) as Component | Component[];

      const data = this.serializeResult(result);
      return ResponseHelper.ok(data);
    } catch (error) {
      return this.handleError(error);
    }
  }

  private serializeResult(result: Component | Component[]) {
    return Array.isArray(result) ? result.map((c) => c.toJSON()) : result.toJSON();
  }

  private handleError(error: unknown): IResponse {
    if (error instanceof ZodError) {
      return ResponseHelper.fromZodError(error);
    }

    if (error instanceof AppError) {
      return error.toResponse();
    }

    return ResponseHelper.serverError(error instanceof Error ? error.message : 'Unknown error');
  }
}
