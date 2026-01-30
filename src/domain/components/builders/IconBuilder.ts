import { IconComponent } from '../types/types';
import { ComponentValidator } from '../validators/ComponentValidator';
import { applyOptions } from '../helpers/applyOptions';

export class IconBuilder {
  private component: Partial<IconComponent> = {
    type: 'icon',
    iconType: 'material',
  };

  icon(name: string): this {
    ComponentValidator.validateNotEmpty(name, 'Icon name');
    this.component.icon = name;
    return this;
  }

  iconType(type: 'material' | 'cupertino'): this {
    this.component.iconType = type;
    return this;
  }

  size(size: number): this {
    ComponentValidator.validatePositive(size, 'Icon size');
    this.component.size = size;
    return this;
  }

  color(color: string): this {
    ComponentValidator.validateColor(color);
    this.component.color = color;
    return this;
  }

  static create(
    icon: string,
    options?: { color?: string; size?: number; iconType?: 'material' | 'cupertino' },
  ): IconComponent {
    const builder = new IconBuilder().icon(icon);
    applyOptions(builder, options);
    return builder.toJSON();
  }

  toJSON(): IconComponent {
    return this.component as IconComponent;
  }
}
