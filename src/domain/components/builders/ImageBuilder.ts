import { ImageComponent } from '../types/types';
import { ComponentValidator } from '../validators/ComponentValidator';
import { applyOptions } from '../helpers/applyOptions';

export class ImageBuilder {
  private component: Partial<ImageComponent> = {
    type: 'image',
  };

  src(source: string): this {
    ComponentValidator.validateNotEmpty(source, 'Image source');
    this.component.src = source;
    return this;
  }

  width(value: number): this {
    ComponentValidator.validatePositive(value, 'Image width');
    this.component.width = value;
    return this;
  }

  height(value: number): this {
    ComponentValidator.validatePositive(value, 'Image height');
    this.component.height = value;
    return this;
  }

  fit(value: 'contain' | 'cover' | 'fill' | 'fitWidth' | 'fitHeight' | 'none' | 'scaleDown'): this {
    this.component.fit = value;
    return this;
  }

  static create(
    src: string,
    options?: {
      width?: number;
      height?: number;
      fit?: 'contain' | 'cover' | 'fill' | 'fitWidth' | 'fitHeight' | 'none' | 'scaleDown';
    },
  ): ImageComponent {
    const builder = new ImageBuilder().src(src);
    applyOptions(builder, options);
    return builder.toJSON();
  }

  toJSON(): ImageComponent {
    return this.component as ImageComponent;
  }
}
