import { Screen } from '@prisma/client';

export interface IScreenRepository {
  save(screen: Screen): Promise<void>;
  findById(id: string): Promise<Screen | null>;
  findByName(name: string): Promise<Screen | null>;
  findAll(): Promise<Screen[]>;
  update(screen: Screen): Promise<void>;
  delete(id: string): Promise<void>;
}
