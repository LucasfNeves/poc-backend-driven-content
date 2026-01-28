import { Screen } from '@/domain/entities/Screen';
import { IScreenRepository } from '@/domain/interfaces/IScreenRepository';
import { ScreenName } from '@/domain/value-objects';
import { NotFoundError } from '@/shared/errors/AppErrors';

export class GetScreenByName {
  constructor(private readonly screenRepository: IScreenRepository) {}

  async execute(name: string): Promise<Screen> {
    const screenNameString = ScreenName.create(name).toString();
    const screen = await this.screenRepository.findByName(screenNameString);

    if (!screen) {
      throw new NotFoundError('Screen', screenNameString);
    }

    return screen;
  }
}
