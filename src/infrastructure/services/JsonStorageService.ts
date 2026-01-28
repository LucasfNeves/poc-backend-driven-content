import { writeFile, mkdir, unlink } from 'fs/promises';
import { join } from 'path';
import { Component } from '@/domain/entities/Component';

export class JsonStorageService {
  constructor(private readonly basePath: string = './components') {}

  async save(component: Component): Promise<void> {
    await mkdir(this.basePath, { recursive: true });
    const filePath = join(this.basePath, `${component.name}.json`);
    await writeFile(filePath, JSON.stringify(component.toJSON(), null, 2), 'utf-8');
  }

  async delete(name: string): Promise<void> {
    const filePath = join(this.basePath, `${name}.json`);
    await unlink(filePath);
  }
}
