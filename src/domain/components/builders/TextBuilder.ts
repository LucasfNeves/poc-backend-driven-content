import { TextComponent } from '../types/types';
import { ComponentValidator } from '../validators/ComponentValidator';
import { ensureProperty } from '../helpers/ensureProperty';
import { applyOptions } from '../helpers/applyOptions';

export class TextBuilder {
  private component: Partial<TextComponent> = {
    type: 'text',
    data: '',
  };

  data(text: string): this {
    ComponentValidator.validateNotEmpty(text, 'Text data');
    this.component.data = text;
    return this;
  }

  fontSize(size: number): this {
    ComponentValidator.validatePositive(size, 'Font size');
    ensureProperty(this.component, 'style').fontSize = size;
    return this;
  }

  fontWeight(weight: string): this {
    ComponentValidator.validateNotEmpty(weight, 'Font weight');
    ensureProperty(this.component, 'style').fontWeight = weight;
    return this;
  }

  color(color: string): this {
    ComponentValidator.validateColor(color);
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
