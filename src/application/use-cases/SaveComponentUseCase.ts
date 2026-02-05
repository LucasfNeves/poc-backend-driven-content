import { Component } from '@/domain/entities/Component';
import { ComponentRepository } from '@/infrastructure/repositories/postgres/ComponentRepository';
import { ConflictError } from '@/shared/errors/AppErrors';

export class SaveComponentUseCase {
  constructor(private readonly repository: ComponentRepository) {}

  async execute(name: string, componentData: unknown): Promise<Component> {
    const existing = await this.repository.findByName(name);

    if (existing) {
      throw new ConflictError('Component', 'name', name);
    }

    const component = Component.create(name, componentData);
    const componentSaved = await this.repository.save(component);
    return componentSaved;
  }
}
