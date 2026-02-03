import { iconComponentSchema } from '@/shared/schemas/componentSchema/iconComponentSchema';
import lodash from 'lodash';
import { z } from 'zod';

export type IconComponentSchema = z.infer<typeof iconComponentSchema>;

export class IconVO {
  private constructor(private readonly props: IconComponentSchema) {}

  static create(props: Partial<Omit<IconComponentSchema, 'type'>>): IconVO {
    const validated = iconComponentSchema.parse({
      type: 'icon',
      ...props,
    });
    return new IconVO(validated);
  }

  static createJSON(props: Partial<Omit<IconComponentSchema, 'type'>>): IconComponentSchema {
    return IconVO.create(props).toJSON();
  }

  static reconstitute(props: IconComponentSchema): IconVO {
    const validated = iconComponentSchema.parse(props);
    return new IconVO(validated);
  }

  equals(other: IconVO): boolean {
    if (!(other instanceof IconVO)) return false;
    return lodash.isEqual(this.props, other.props);
  }

  toJSON(): IconComponentSchema {
    return { ...this.props };
  }
}
