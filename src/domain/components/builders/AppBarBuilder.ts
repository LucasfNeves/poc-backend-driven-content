import {
  AppBarComponent,
  TextComponent,
  ImageComponent,
  IconButtonComponent,
} from '../types/types';
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
    shadowColor?: string;
    surfaceTintColor?: string;
    iconTheme?: { color?: string; size?: number; opacity?: number };
    actionsIconTheme?: { color?: string; size?: number; opacity?: number };
    toolbarHeight?: number;
    leadingWidth?: number;
    titleSpacing?: number;
    titleTextAlign?: 'left' | 'right' | 'center' | 'justify' | 'start' | 'end';
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
    this.component.backgroundColor = color;
    return this;
  }

  foregroundColor(color: string): this {
    this.component.foregroundColor = color;
    return this;
  }

  elevation(value: number): this {
    this.component.elevation = value;
    return this;
  }

  centerTitle(value: boolean): this {
    this.component.centerTitle = value;
    return this;
  }

  leading(iconButton: IconButtonComponent): this {
    this.component.leading = iconButton;
    return this;
  }

  actions(actions: IconButtonComponent[]): this {
    if (!Array.isArray(actions)) {
      throw new Error('Actions must be an array');
    }
    this.component.actions = actions;
    return this;
  }

  shadowColor(color: string): this {
    this.component.shadowColor = color;
    return this;
  }

  surfaceTintColor(color: string): this {
    this.component.surfaceTintColor = color;
    return this;
  }

  iconTheme(theme: { color?: string; size?: number; opacity?: number }): this {
    this.component.iconTheme = theme;
    return this;
  }

  actionsIconTheme(theme: { color?: string; size?: number; opacity?: number }): this {
    this.component.actionsIconTheme = theme;
    return this;
  }

  toolbarHeight(value: number): this {
    this.component.toolbarHeight = value;
    return this;
  }

  leadingWidth(value: number): this {
    this.component.leadingWidth = value;
    return this;
  }

  titleSpacing(value: number): this {
    this.component.titleSpacing = value;
    return this;
  }

  titleTextAlign(align: 'left' | 'right' | 'center' | 'justify' | 'start' | 'end'): this {
    this.component.titleTextAlign = align;
    return this;
  }

  toJSON(): AppBarComponent {
    return this.component as AppBarComponent;
  }
}
