import { ScreenValidationError } from '@/shared/errors/AppErrors';
import { CreateScreenData, ScreenConfig, ScreenPersistenceData } from './types/interfaces';

export class Screen {
  private constructor(private readonly props: ScreenPersistenceData) {}
  private validate(): void {
    if (this.props.version < 1) {
      throw new ScreenValidationError('version', 'must be at least 1');
    }

    if (!this.props.config || typeof this.props.config !== 'object') {
      throw new ScreenValidationError('config', 'must be a valid object');
    }
  }

  static fromPersistence(data: ScreenPersistenceData): Screen {
    return new Screen({
      id: data.id,
      name: data.name,
      config: data.config || {},
      version: data.version,
      isActive: data.isActive,
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt),
    });
  }

  static create(data: CreateScreenData): Screen {
    const screen = new Screen({
      id: crypto.randomUUID(),
      name: data.name.toString(),
      config: data.config,
      version: data.version,
      isActive: data.isActive,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    screen.validate();
    return screen;
  }

  activate(): Screen {
    return new Screen({
      ...this.props,
      isActive: true,
      updatedAt: new Date(),
    });
  }

  deactivate(): Screen {
    return new Screen({
      ...this.props,
      isActive: false,
      updatedAt: new Date(),
    });
  }

  updateConfig(newConfig: ScreenConfig): Screen {
    return new Screen({
      ...this.props,
      config: newConfig,
      version: this.props.version + 1,
      updatedAt: new Date(),
    });
  }

  toJSON(): ScreenPersistenceData {
    return {
      ...this.props,
    };
  }

  equals(other: Screen): boolean {
    return this.id === other.id;
  }

  get id(): string {
    return this.props.id;
  }

  get name(): string {
    return this.props.name.toString();
  }

  get config(): ScreenConfig {
    return this.props.config as ScreenConfig;
  }

  get version(): number {
    return this.props.version;
  }

  get isActive(): boolean {
    return this.props.isActive;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }
}
