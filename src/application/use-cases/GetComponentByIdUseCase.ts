import { Component } from '@/domain/entities/Component';
import { ComponentRepository } from '@/infrastructure/repositories/postgres/ComponentRepository';
import { NotFoundError } from '@/shared/errors/AppErrors';

export class GetComponentByIdUseCase {
  constructor(private readonly repository: ComponentRepository) {}

  async execute(id: string): Promise<Component> {
    const component = await this.repository.findById(id);

    if (!component) {
      throw new NotFoundError('Component', id);
    }

    return component;
  }
}
