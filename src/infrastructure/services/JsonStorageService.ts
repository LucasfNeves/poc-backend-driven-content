import { writeFile, mkdir, unlink } from 'fs/promises';
import { join } from 'path';
import { Component } from '@/domain/entities/Component';

export class JsonStorageService {
  constructor(private readonly basePath: string = './components') {}

  async save(component: Component): Promise<void> {
    try {
      await mkdir(this.basePath, { recursive: true });
      const filePath = this.getFilePath(component.name);
      await writeFile(filePath, JSON.stringify(component.toJSON(), null, 2), 'utf-8');
    } catch (error) {
      throw new Error(
        `Failed to save component: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
    }
  }

  async delete(name: string): Promise<void> {
    try {
      const filePath = this.getFilePath(name);
      await unlink(filePath);
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        throw new Error(`Component '${name}' not found`);
      }
      throw new Error(
        `Failed to delete component: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
    }
  }

  private getFilePath(name: string): string {
    return join(this.basePath, `${name}.json`);
  }
}
