import { Screen, ScreenConfig } from '@/domain/entities/Screen';
import { ConflictError } from '@/domain/errors';
import { IScreenRepository } from '@/domain/interfaces/IScreenRepository';

interface SaveScreenDTO {
  name: string;
  config: ScreenConfig;
  isActive?: boolean;
}

export class SaveScreenUseCase {
  constructor(private readonly screenRepository: IScreenRepository) {}

  async execute(data: SaveScreenDTO): Promise<Screen> {
    const existingScreen = await this.screenRepository.findByName(data.name);
    if (existingScreen) {
      throw new ConflictError('Screen', 'name', data.name);
    }

    const screen = Screen.create({
      name: data.name,
      config: data.config,
      version: 1,
      isActive: data.isActive ?? true,
    });

    const savedScreen = await this.screenRepository.save(screen);

    return savedScreen;
  }
}
