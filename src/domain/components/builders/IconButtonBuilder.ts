import { IconButtonComponent, IconComponent } from '../types/types';
import { ComponentValidator } from '../validators/ComponentValidator';

export class IconButtonBuilder {
  private component: Partial<IconButtonComponent> = {
    type: 'iconButton',
  };

  static create(iconComponent: IconComponent): IconButtonComponent {
    return new IconButtonBuilder().icon(iconComponent).toJSON();
  }

  icon(icon: IconComponent): this {
    ComponentValidator.validateComponentType(icon, 'icon', 'Icon');
    this.component.icon = icon;
    return this;
  }

  onPressed(action: string, route?: string, params?: Record<string, unknown>): this {
    this.component.onPressed = { action, route, params };
    return this;
  }

  toJSON(): IconButtonComponent {
    return this.component as IconButtonComponent;
  }
}
