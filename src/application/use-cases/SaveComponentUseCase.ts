import { Component } from '@/domain/entities/Component';
import { ComponentRepository } from '@/infrastructure/repositories/postgres/ComponentRepository';
import { JsonStorageService } from '@/infrastructure/services/JsonStorageService';

export class SaveComponentUseCase {
  constructor(
    private readonly repository: ComponentRepository,
    private readonly jsonStorage: JsonStorageService,
  ) {}

  async execute(name: string, componentData: unknown): Promise<Component> {
    const existing = await this.repository.findByName(name);

    let component: Component;
    if (existing) {
      component = existing.updateComponent(componentData);
      component = await this.repository.update(component);
    } else {
      component = Component.create(name, componentData);
      component = await this.repository.save(component);
    }

    await this.jsonStorage.save(component);
    return component;
  }
}
