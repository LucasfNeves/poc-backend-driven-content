import { Screen } from '@/domain/entities/Screen';

export interface IScreenRepository {
  save(screen: Screen): Promise<Screen>;
  findById(id: string): Promise<Screen | null>;
  findByName(name: string): Promise<Screen | null>;
  findAll(): Promise<Screen[]>;
  update(screen: Screen): Promise<Screen>;
  delete(id: string): Promise<{ id: string; name: string }>;
}
