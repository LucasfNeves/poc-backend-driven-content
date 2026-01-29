import { Component } from '@/domain/entities/Component';
import { ComponentRepository } from '@/infrastructure/repositories/postgres/ComponentRepository';
import { JsonStorageService } from '@/infrastructure/services/JsonStorageService';
import { NotFoundError } from '@/shared/errors/AppErrors';

export class UpdateComponentUseCase {
  constructor(
    private readonly repository: ComponentRepository,
    private readonly jsonStorage: JsonStorageService,
  ) {}

  async execute(name: string, componentData: unknown): Promise<Component> {
    const existing = await this.repository.findByName(name);

    if (!existing) {
      throw new NotFoundError('Component', name);
    }

    const updated = existing.updateComponent(componentData);
    const saved = await this.repository.update(updated);
    await this.jsonStorage.save(saved);

    return saved;
  }
}
