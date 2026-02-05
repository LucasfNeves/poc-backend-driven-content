import {
  componentSchema,
  ValidatedComponent,
} from '../../shared/schemas/componentSchema/componentSchema';
import { InputJsonValue } from '@prisma/client/runtime/client';

export interface ComponentMetadata {
  id: string;
  name: string;
  component: ValidatedComponent;
  version: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class Component {
  private constructor(private readonly props: ComponentMetadata) {}

  static create(name: string, component: unknown): Component {
    const validated = componentSchema.parse(component);

    return new Component({
      id: crypto.randomUUID(),
      name,
      component: validated,
      version: 1,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  static reconstitute(data: ComponentMetadata): Component {
    return new Component(data);
  }

  updateComponent(newComponent: unknown): Component {
    const validated = componentSchema.parse(newComponent);

    return new Component({
      ...this.props,
      component: validated,
      version: this.props.version + 1,
      updatedAt: new Date(),
    });
  }

  equals(other: Component): boolean {
    return this.props.id === other.id;
  }

  toJSON(): ComponentMetadata {
    return { ...this.props };
  }

  toPersistence(): InputJsonValue {
    return this.props.component as unknown as InputJsonValue;
  }

  get id(): string {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }

  get component(): ValidatedComponent {
    return this.props.component;
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
