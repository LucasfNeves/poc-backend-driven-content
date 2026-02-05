import {
  sizedBoxComponentSchema,
  SizedBoxComponentSchema,
} from '@/shared/schemas/componentSchema/sizedBoxComponentSchema';
import lodash from 'lodash';

export class SizedBoxVO {
  private constructor(private readonly props: SizedBoxComponentSchema) {}

  static create(props?: Partial<Omit<SizedBoxComponentSchema, 'type'>>): SizedBoxVO {
    const validated = sizedBoxComponentSchema.parse({
      type: 'sizedBox',
      ...props,
    });
    return new SizedBoxVO(validated);
  }

  static createJSON(
    props?: Partial<Omit<SizedBoxComponentSchema, 'type'>>,
  ): SizedBoxComponentSchema {
    return SizedBoxVO.create(props).toJSON();
  }

  static reconstitute(props: SizedBoxComponentSchema): SizedBoxVO {
    const validated = sizedBoxComponentSchema.parse(props);
    return new SizedBoxVO(validated);
  }

  equals(other: SizedBoxVO): boolean {
    if (!(other instanceof SizedBoxVO)) return false;
    return lodash.isEqual(this.props, other.props);
  }

  toJSON(): SizedBoxComponentSchema {
    return { ...this.props };
  }
}
