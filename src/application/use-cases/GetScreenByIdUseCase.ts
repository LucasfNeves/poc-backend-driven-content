import { Screen } from '@/domain/entities/Screen';
import { IScreenRepository } from '@/domain/interfaces/IScreenRepository';
import { ValidationHelper } from '@/shared/helpers/ValidationHelper';
import { NotFoundError } from '@/shared/errors/AppErrors';

export class GetScreenByIdUseCase {
  constructor(private readonly screenRepository: IScreenRepository) {}

  async execute(id: string): Promise<Screen> {
    ValidationHelper.validateUUID(id, 'Screen ID');

    const screen = await this.screenRepository.findById(id);

    if (!screen) {
      throw new NotFoundError('Screen', id);
    }

    return screen;
  }
}
