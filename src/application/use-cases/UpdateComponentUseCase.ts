import { Component } from '@/domain/entities/Component';
import { ComponentRepository } from '@/infrastructure/repositories/postgres/ComponentRepository';
import { JsonStorageService } from '@/infrastructure/services/JsonStorageService';
import { NotFoundError } from '@/shared/errors/AppErrors';

export class UpdateComponentUseCase {
  constructor(
    private readonly repository: ComponentRepository,
    private readonly jsonStorage: JsonStorageService,
  ) {}

  async execute(
    id: string,
    data: { name?: string; component?: unknown; isActive?: boolean },
  ): Promise<Component> {
    const existing = await this.repository.findById(id);

    if (!existing) {
      throw new NotFoundError('Component', id);
    }

    const updated = existing.updateComponent(data.component || existing.component);
    const component = await this.repository.update(updated);
    await this.jsonStorage.save(component);
    return component;
  }
}
