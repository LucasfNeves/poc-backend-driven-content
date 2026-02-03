import { IconButtonComponent, IconComponent } from '../types/types';

export class IconButtonBuilder {
  private component: Partial<IconButtonComponent> = {
    type: 'iconButton',
  };

  static create(
    iconComponent: IconComponent,
    options?: { action?: string; route?: string; params?: Record<string, unknown> },
  ): IconButtonComponent {
    const builder = new IconButtonBuilder().icon(iconComponent);
    if (options?.action) {
      builder.onPressed(options.action, options.route, options.params);
    }
    return builder.toJSON();
  }

  icon(icon: IconComponent): this {
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
