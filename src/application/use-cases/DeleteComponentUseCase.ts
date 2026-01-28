import { ComponentRepository } from '@/infrastructure/repositories/postgres/ComponentRepository';
import { JsonStorageService } from '@/infrastructure/services/JsonStorageService';
import { NotFoundError } from '@/shared/errors/AppErrors';

export class DeleteComponentUseCase {
  constructor(
    private readonly repository: ComponentRepository,
    private readonly jsonStorage: JsonStorageService,
  ) {}

  async execute(id: string): Promise<{ id: string; name: string }> {
    const existing = await this.repository.findById(id);

    if (!existing) {
      throw new NotFoundError('Component', id);
    }

    const result = await this.repository.delete(id);
    await this.jsonStorage.delete(result.name);
    return result;
  }
}
