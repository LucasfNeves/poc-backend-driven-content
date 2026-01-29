import { Component } from '@/domain/entities/Component';
import { ComponentRepository } from '@/infrastructure/repositories/postgres/ComponentRepository';
import { JsonStorageService } from '@/infrastructure/services/JsonStorageService';
import { ConflictError } from '@/shared/errors/AppErrors';

export class SaveComponentUseCase {
  constructor(
    private readonly repository: ComponentRepository,
    private readonly jsonStorage: JsonStorageService,
  ) {}

  async execute(name: string, componentData: unknown): Promise<Component> {
    const existing = await this.repository.findByName(name);

    if (existing) {
      throw new ConflictError('Component', 'name', name);
    }

    const component = Component.create(name, componentData);
    const saved = await this.repository.save(component);
    await this.jsonStorage.save(saved);

    return saved;
  }
}
