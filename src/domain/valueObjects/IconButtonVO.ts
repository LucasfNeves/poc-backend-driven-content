import { iconButtonComponentSchema } from '@/shared/schemas/componentSchema/iconButtonComponentSchema';
import lodash from 'lodash';
import { z } from 'zod';

export type IconButtonComponentSchema = z.infer<typeof iconButtonComponentSchema>;

export class IconButtonVO {
  private constructor(private readonly props: IconButtonComponentSchema) {}

  static create(props: Partial<Omit<IconButtonComponentSchema, 'type'>>): IconButtonVO {
    const validated = iconButtonComponentSchema.parse({
      type: 'iconButton',
      ...props,
    });
    return new IconButtonVO(validated);
  }

  static createJSON(
    props: Partial<Omit<IconButtonComponentSchema, 'type'>>,
  ): IconButtonComponentSchema {
    return IconButtonVO.create(props).toJSON();
  }

  static reconstitute(props: IconButtonComponentSchema): IconButtonVO {
    const validated = iconButtonComponentSchema.parse(props);
    return new IconButtonVO(validated);
  }

  equals(other: IconButtonVO): boolean {
    if (!(other instanceof IconButtonVO)) return false;
    return lodash.isEqual(this.props, other.props);
  }

  toJSON(): IconButtonComponentSchema {
    return { ...this.props };
  }
}
