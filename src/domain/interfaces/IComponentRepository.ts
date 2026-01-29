import { Component } from '@/domain/entities/Component';

export interface IComponentRepository {
  findById(id: string): Promise<Component | null>;
  save(component: Component): Promise<Component>;
  findByName(name: string): Promise<Component | null>;
  findAll(): Promise<Component[]>;
  update(component: Component): Promise<Component>;
  delete(id: string): Promise<{ id: string; name: string }>;
}
