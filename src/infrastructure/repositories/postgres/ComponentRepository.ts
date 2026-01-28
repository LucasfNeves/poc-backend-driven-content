import { Component } from '@/domain/entities/Component';
import { IComponentRepository } from '@/domain/interfaces/IComponentRepository';
import { prisma } from '@/infrastructure/database/prisma/client';
import { Component as ComponentType } from '@/domain/components/types/types';

export class ComponentRepository implements IComponentRepository {
  private toEntity(data: {
    id: string;
    name: string;
    config: unknown;
    version: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
  }): Component {
    return Component.fromPersistence({
      id: data.id,
      name: data.name,
      component: data.config as ComponentType,
      version: data.version,
      isActive: data.isActive,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });
  }

  async findById(id: string): Promise<Component | null> {
    const data = await prisma.screen.findUnique({ where: { id } });
    if (!data) return null;
    return this.toEntity(data);
  }

  async save(component: Component): Promise<Component> {
    const created = await prisma.screen.create({
      data: {
        id: component.id,
        name: component.name,
        config: component.toPersistence(),
        version: component.version,
        isActive: component.isActive,
        createdAt: component.createdAt,
        updatedAt: component.updatedAt,
      },
    });
    return this.toEntity(created);
  }

  async findByName(name: string): Promise<Component | null> {
    const data = await prisma.screen.findUnique({ where: { name } });
    if (!data) return null;
    return this.toEntity(data);
  }

  async findAll(): Promise<Component[]> {
    const data = await prisma.screen.findMany({ orderBy: { createdAt: 'desc' } });
    return data.map((d) => this.toEntity(d));
  }

  async update(component: Component): Promise<Component> {
    const updated = await prisma.screen.update({
      where: { id: component.id },
      data: {
        name: component.name,
        config: component.toPersistence(),
        version: component.version,
        isActive: component.isActive,
        updatedAt: component.updatedAt,
      },
    });
    return this.toEntity(updated);
  }

  async delete(id: string): Promise<{ id: string; name: string }> {
    return await prisma.screen.delete({
      where: { id },
      select: { id: true, name: true },
    });
  }
}
