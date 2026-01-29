import { ComponentRepository } from '@/infrastructure/repositories/postgres/ComponentRepository';
import { NotFoundError } from '@/shared/errors/AppErrors';

export class DeleteComponentUseCase {
  constructor(private readonly repository: ComponentRepository) {}

  async execute(id: string): Promise<{ id: string; name: string }> {
    const existing = await this.repository.findById(id);

    if (!existing) {
      throw new NotFoundError('Component', id);
    }

    const componentDeleted = await this.repository.delete(id);

    return componentDeleted;
  }
}
