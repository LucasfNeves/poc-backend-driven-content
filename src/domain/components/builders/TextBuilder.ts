import { TextComponent } from '../types/types';
import { ensureProperty } from '../helpers/ensureProperty';
import { applyOptions } from '../helpers/applyOptions';

export class TextBuilder {
  private component: Partial<TextComponent> = {
    type: 'text',
    data: '',
  };

  data(text: string): this {
    this.component.data = text;
    return this;
  }

  fontSize(size: number): this {
    ensureProperty(this.component, 'style').fontSize = size;
    return this;
  }

  fontWeight(weight: string): this {
    ensureProperty(this.component, 'style').fontWeight = weight;
    return this;
  }

  color(color: string): this {
    ensureProperty(this.component, 'style').color = color;
    return this;
  }

  static create(
    text: string,
    options?: { fontSize?: number; fontWeight?: string; color?: string },
  ): TextComponent {
    const builder = new TextBuilder().data(text);
    applyOptions(builder, options);
    return builder.toJSON();
  }

  toJSON(): TextComponent {
    return this.component as TextComponent;
  }
}
