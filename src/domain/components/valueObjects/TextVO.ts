import { textComponentSchema } from '@/shared/schemas/componentSchema/textComponentSchema';
import lodash from 'lodash';
import { z } from 'zod';

export type TextComponentSchema = z.infer<typeof textComponentSchema>;

export class TextVO {
  private constructor(private readonly props: TextComponentSchema) {}

  static create(props: Partial<Omit<TextComponentSchema, 'type'>>): TextVO {
    const validated = textComponentSchema.parse({
      type: 'text',
      ...props,
    });
    return new TextVO(validated);
  }

  static createJSON(props: Partial<Omit<TextComponentSchema, 'type'>>): TextComponentSchema {
    return TextVO.create(props).toJSON();
  }

  static reconstitute(props: TextComponentSchema): TextVO {
    const validated = textComponentSchema.parse(props);
    return new TextVO(validated);
  }

  equals(other: TextVO): boolean {
    if (!(other instanceof TextVO)) return false;
    return lodash.isEqual(this.props, other.props);
  }

  toJSON(): TextComponentSchema {
    return { ...this.props };
  }
}
