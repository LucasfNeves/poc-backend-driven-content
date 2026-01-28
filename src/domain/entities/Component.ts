import { validateComponent } from '../components/schemas/componentSchema';
import { Component as ComponentType } from '../components/types/types';

export interface ComponentMetadata {
  id: string;
  name: string;
  component: ComponentType;
  version: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class Component {
  private constructor(private readonly props: ComponentMetadata) {}

  static create(name: string, component: unknown): Component {
    const validated = validateComponent(component);

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

  static fromPersistence(data: ComponentMetadata): Component {
    return new Component(data);
  }

  updateComponent(newComponent: unknown): Component {
    const validated = validateComponent(newComponent);

    return new Component({
      ...this.props,
      component: validated,
      version: this.props.version + 1,
      updatedAt: new Date(),
    });
  }

  toJSON(): ComponentMetadata {
    return { ...this.props };
  }

  get id(): string {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }

  get component(): ComponentType {
    return this.props.component;
  }

  get version(): number {
    return this.props.version;
  }

  get isActive(): boolean {
    return this.props.isActive;
  }
}
