import { AppBarComponent } from '../types/types';
import { ComponentValidator } from '../validators/ComponentValidator';
import { TextBuilder } from './TextBuilder';
import { IconBuilder } from './IconBuilder';
import { IconButtonBuilder } from './IconButtonBuilder';
import { DesignTokens } from '../constants/DesignTokens';

export class CustomHeaderBuilder {
  private component: Partial<AppBarComponent> = {
    type: 'appBar',
    elevation: DesignTokens.elevation.none,
    centerTitle: true,
  };

  private getForegroundColor(): string {
    return this.component.foregroundColor || DesignTokens.colors.black;
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

  title(text: string, fontSize: number = DesignTokens.fontSize.xlarge): this {
    this.component.title = TextBuilder.create(text, {
      fontSize,
      fontWeight: DesignTokens.fontWeight.bold,
      color: this.getForegroundColor(),
    });
    return this;
  }

  leadingIcon(icon: string): this {
    const iconComponent = IconBuilder.create(icon, {
      color: this.getForegroundColor(),
      size: DesignTokens.iconSize.medium,
    });
    this.component.leading = IconButtonBuilder.create(iconComponent);
    return this;
  }

  toJSON(): AppBarComponent {
    return this.component as AppBarComponent;
  }
}
