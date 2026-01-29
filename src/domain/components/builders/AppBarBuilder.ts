import { TextBuilder } from './TextBuilder';
import { IconBuilder } from './IconBuilder';
import { AppBarComponent } from '../types/types';

export class AppBarBuilder {
  private component: Partial<AppBarComponent> = {
    type: 'appBar',
  };

  title(text: string): this {
    this.component.title = new TextBuilder().data(text).build();
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

  centerTitle(value: boolean = true): this {
    this.component.centerTitle = value;
    return this;
  }

  leading(icon: string, action?: string): this {
    this.component.leading = {
      type: 'iconButton',
      icon: new IconBuilder().icon(icon).build(),
      ...(action && { onPressed: { action } }),
    };
    return this;
  }

  addAction(icon: string, action?: string): this {
    if (!this.component.actions) this.component.actions = [];
    this.component.actions.push({
      type: 'iconButton',
      icon: new IconBuilder().icon(icon).build(),
      ...(action && { onPressed: { action } }),
    });
    return this;
  }

  build(): AppBarComponent {
    return this.component as AppBarComponent;
  }
}
