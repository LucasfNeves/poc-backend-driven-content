export interface ScreenConfig {
  [key: string]: unknown;
}

interface ScreenProps {
  id: string;
  name: string;
  config: ScreenConfig;
  version: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class Screen {
  private constructor(private readonly props: ScreenProps) {
    this.validate();
  }

  private validate(): void {
    if (!this.props.name || this.props.name.trim().length === 0) {
      throw new Error('Screen name cannot be empty');
    }

    if (this.props.version < 1) {
      throw new Error('Screen version must be at least 1');
    }

    if (!this.props.config || typeof this.props.config !== 'object') {
      throw new Error('Screen config must be a valid object');
    }
  }

  static fromPersistence(data: ScreenProps): Screen {
    return new Screen({
      id: data.id,
      name: data.name,
      config: data.config,
      version: data.version,
      isActive: data.isActive,
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt),
    });
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

  toJSON(): ScreenProps {
    return { ...this.props };
  }

  equals(other: Screen): boolean {
    return this.id === other.id;
  }

  get id(): string {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }

  get config(): ScreenConfig {
    return this.props.config;
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
