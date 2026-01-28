import { Screen } from '@/domain/entities/Screen';
import { ConflictError } from '@/shared/errors/AppErrors';
import { IScreenRepository } from '@/domain/interfaces/IScreenRepository';
import { ScreenName } from '@/domain/value-objects';
import { ScreenConfig } from '@/domain/entities/types/interfaces';

interface SaveScreenDTO {
  name: string;
  config: ScreenConfig;
  isActive?: boolean;
}

export class SaveScreenUseCase {
  constructor(private readonly screenRepository: IScreenRepository) {}

  async execute(data: SaveScreenDTO): Promise<Screen> {
    const screenName = ScreenName.create(data.name);

    const existingScreen = await this.screenRepository.findByName(screenName.toString());
    if (existingScreen) {
      throw new ConflictError('Screen', 'name', screenName.toString());
    }

    const screen = Screen.create({
      name: screenName,
      config: data.config,
      version: 1,
      isActive: data.isActive ?? true,
    });

    const savedScreen = await this.screenRepository.save(screen);

    return savedScreen;
  }
}
