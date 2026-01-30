import {
  AppBarComponent,
  TextComponent,
  ImageComponent,
  IconButtonComponent,
} from '../types/types';
import { ComponentValidator } from '../validators/ComponentValidator';
import { applyOptions } from '../helpers/applyOptions';

export class AppBarBuilder {
  private component: Partial<AppBarComponent> = {
    type: 'appBar',
    elevation: 4,
    centerTitle: false,
  };

  static create(options?: {
    title?: TextComponent | ImageComponent;
    backgroundColor?: string;
    foregroundColor?: string;
    elevation?: number;
    centerTitle?: boolean;
    leading?: IconButtonComponent;
    actions?: IconButtonComponent[];
  }): AppBarComponent {
    const builder = new AppBarBuilder();
    applyOptions(builder, options);
    return builder.toJSON();
  }

  title(title: TextComponent | ImageComponent): this {
    const validTypes = ['text', 'image'];
    if (!validTypes.includes(title.type)) {
      throw new Error('Title must be a text or image component');
    }
    this.component.title = title;
    return this;
  }

  backgroundColor(color: string): this {
    ComponentValidator.validateColor(color);
    this.component.backgroundColor = color;
    return this;
  }

  foregroundColor(color: string): this {
    ComponentValidator.validateColor(color);
    this.component.foregroundColor = color;
    return this;
  }

  elevation(value: number): this {
    ComponentValidator.validateNonNegative(value, 'Elevation');
    this.component.elevation = value;
    return this;
  }

  centerTitle(value: boolean): this {
    this.component.centerTitle = value;
    return this;
  }

  leading(iconButton: IconButtonComponent): this {
    ComponentValidator.validateComponentType(iconButton, 'iconButton', 'Leading');
    this.component.leading = iconButton;
    return this;
  }

  actions(actions: IconButtonComponent[]): this {
    if (!Array.isArray(actions)) {
      throw new Error('Actions must be an array');
    }
    actions.forEach((action, index) => {
      ComponentValidator.validateComponentType(action, 'iconButton', `Action at index ${index}`);
    });
    this.component.actions = actions;
    return this;
  }

  toJSON(): AppBarComponent {
    return this.component as AppBarComponent;
  }
}
