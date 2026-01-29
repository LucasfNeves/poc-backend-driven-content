import { TextComponent } from '../types/types';

export class TextBuilder {
  private component: Partial<TextComponent> = {
    type: 'text',
    data: '',
  };

  private ensureStyle() {
    if (!this.component.style) this.component.style = {};
    return this.component.style;
  }

  data(text: string): this {
    this.component.data = text;
    return this;
  }

  fontSize(size: number): this {
    this.ensureStyle().fontSize = size;
    return this;
  }

  fontWeight(weight: string): this {
    this.ensureStyle().fontWeight = weight;
    return this;
  }

  color(color: string): this {
    this.ensureStyle().color = color;
    return this;
  }

  build(): TextComponent {
    return this.component as TextComponent;
  }
}
