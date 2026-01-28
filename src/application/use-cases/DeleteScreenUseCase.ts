import { NotFoundError } from '@/shared/errors/AppErrors';
import { ScreenRepository } from '@/infrastructure/repositories/postgres/ScreenRepository';

export class DeleteScreenUseCase {
  constructor(private readonly screenRepository: ScreenRepository) {}

  async execute(id: string): Promise<{ id: string; name: string }> {
    const screen = await this.screenRepository.findById(id);

    if (!screen) {
      throw new NotFoundError('Screen', id);
    }

    const deletedScreen = await this.screenRepository.delete(id);

    return deletedScreen;
  }
}
