import { IconComponent } from '../types/types';

export class IconBuilder {
  private component: Partial<IconComponent> = {
    type: 'icon',
    icon: '',
  };

  icon(name: string): this {
    this.component.icon = name;
    return this;
  }

  iconType(type: 'material' | 'cupertino'): this {
    this.component.iconType = type;
    return this;
  }

  size(size: number): this {
    this.component.size = size;
    return this;
  }

  color(color: string): this {
    this.component.color = color;
    return this;
  }

  build(): IconComponent {
    return this.component as IconComponent;
  }
}
