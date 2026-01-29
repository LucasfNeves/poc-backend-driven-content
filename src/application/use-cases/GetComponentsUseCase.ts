import { Component } from '@/domain/entities/Component';
import { ComponentRepository } from '@/infrastructure/repositories/postgres/ComponentRepository';
import { NotFoundError } from '@/shared/errors/AppErrors';

interface GetComponentsParams {
  id?: string;
  name?: string;
}

export class GetComponentsUseCase {
  constructor(private readonly repository: ComponentRepository) {}

  async execute(params?: GetComponentsParams): Promise<Component | Component[]> {
    if (params?.id) {
      const component = await this.repository.findById(params.id);
      if (!component) {
        throw new NotFoundError('Component', params.id);
      }
      return component;
    }

    if (params?.name) {
      const component = await this.repository.findByName(params.name);
      if (!component) {
        throw new NotFoundError('Component', params.name);
      }
      return component;
    }

    const components = await this.repository.findAll();

    return components;
  }
}
