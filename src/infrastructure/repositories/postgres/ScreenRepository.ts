import { IScreenRepository } from '@/domain/interfaces/IScreenRepository';
import { Screen } from '@/domain/entities/Screen';
import { prisma } from '@/infrastructure/database/prisma/client';
import { InputJsonValue } from '@prisma/client/runtime/client';

export class ScreenRepository implements IScreenRepository {
  async findById(id: string): Promise<Screen | null> {
    const screenData = await prisma.screen.findUnique({
      where: { id },
    });

    if (!screenData) {
      return null;
    }

    return Screen.fromPersistence(screenData);
  }

  async save(screen: Screen): Promise<Screen> {
    const created = await prisma.screen.create({
      data: {
        id: screen.id,
        name: screen.name,
        config: screen.config as InputJsonValue,
        version: screen.version,
        isActive: screen.isActive,
        createdAt: screen.createdAt,
        updatedAt: screen.updatedAt,
      },
    });

    return Screen.fromPersistence(created);
  }

  async findByName(name: string): Promise<Screen | null> {
    const screenData = await prisma.screen.findUnique({
      where: { name },
    });

    if (!screenData) {
      return null;
    }

    return Screen.fromPersistence(screenData);
  }

  async findAll(): Promise<Screen[]> {
    const screensData = await prisma.screen.findMany({
      orderBy: { createdAt: 'desc' },
    });

    const screensMaped = screensData.map((data) => Screen.fromPersistence(data));
    return screensMaped;
  }

  async update(screen: Screen): Promise<Screen> {
    const updated = await prisma.screen.update({
      where: { id: screen.id },
      data: {
        name: screen.name,
        config: screen.config as InputJsonValue,
        version: screen.version,
        isActive: screen.isActive,
        updatedAt: screen.updatedAt,
      },
    });

    return Screen.fromPersistence(updated);
  }

  async delete(id: string): Promise<{ id: string; name: string }> {
    const deletedScreen = await prisma.screen.delete({
      where: { id },
      select: {
        id: true,
        name: true,
      },
    });

    return deletedScreen;
  }
}
