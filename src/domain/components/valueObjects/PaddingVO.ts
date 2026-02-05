import {
  paddingComponentSchema,
  PaddingComponentSchema,
} from '@/shared/schemas/componentSchema/paddingComponentSchema';
import lodash from 'lodash';

export class PaddingVO {
  private constructor(private readonly props: PaddingComponentSchema) {}

  static create(props: Partial<Omit<PaddingComponentSchema, 'type'>>): PaddingVO {
    const validated = paddingComponentSchema.parse({
      type: 'padding',
      ...props,
    });
    return new PaddingVO(validated);
  }

  static createJSON(props: Partial<Omit<PaddingComponentSchema, 'type'>>): PaddingComponentSchema {
    return PaddingVO.create(props).toJSON();
  }

  static reconstitute(props: PaddingComponentSchema): PaddingVO {
    const validated = paddingComponentSchema.parse(props);
    return new PaddingVO(validated);
  }

  equals(other: PaddingVO): boolean {
    if (!(other instanceof PaddingVO)) return false;
    return lodash.isEqual(this.props, other.props);
  }

  toJSON(): PaddingComponentSchema {
    return { ...this.props };
  }
}
