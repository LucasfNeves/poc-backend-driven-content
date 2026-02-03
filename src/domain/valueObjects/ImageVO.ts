import { imageComponentSchema } from '@/shared/schemas/componentSchema/imageComponentSchema';
import lodash from 'lodash';
import { z } from 'zod';

export type ImageComponentSchema = z.infer<typeof imageComponentSchema>;

export class ImageVO {
  private constructor(private readonly props: ImageComponentSchema) {}

  static create(props: Partial<Omit<ImageComponentSchema, 'type'>>): ImageVO {
    const validated = imageComponentSchema.parse({
      type: 'image',
      ...props,
    });
    return new ImageVO(validated);
  }

  static createJSON(props: Partial<Omit<ImageComponentSchema, 'type'>>): ImageComponentSchema {
    return ImageVO.create(props).toJSON();
  }

  static reconstitute(props: ImageComponentSchema): ImageVO {
    const validated = imageComponentSchema.parse(props);
    return new ImageVO(validated);
  }

  equals(other: ImageVO): boolean {
    if (!(other instanceof ImageVO)) return false;
    return lodash.isEqual(this.props, other.props);
  }

  toJSON(): ImageComponentSchema {
    return { ...this.props };
  }
}
