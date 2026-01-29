import { Component } from '@/domain/entities/Component';
import { ComponentRepository } from '@/infrastructure/repositories/postgres/ComponentRepository';
import { NotFoundError } from '@/shared/errors/AppErrors';

export class UpdateComponentUseCase {
  constructor(private readonly repository: ComponentRepository) {}

  async execute(name: string, componentData: unknown): Promise<Component> {
    const existing = await this.repository.findByName(name);

    if (!existing) {
      throw new NotFoundError('Component', name);
    }

    const updated = existing.updateComponent(componentData);
    const componentUpdated = await this.repository.update(updated);
    return componentUpdated;
  }
}
