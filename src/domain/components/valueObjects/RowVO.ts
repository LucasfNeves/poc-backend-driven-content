import {
  rowComponentSchema,
  RowComponentSchema,
} from '@/shared/schemas/componentSchema/rowComponentSchema';
import lodash from 'lodash';

export class RowVO {
  private constructor(private readonly props: RowComponentSchema) {}

  static create(props?: Partial<Omit<RowComponentSchema, 'type'>>): RowVO {
    const validated = rowComponentSchema.parse({
      type: 'row',
      ...props,
    });
    return new RowVO(validated);
  }

  static createJSON(props?: Partial<Omit<RowComponentSchema, 'type'>>): RowComponentSchema {
    return RowVO.create(props).toJSON();
  }

  static reconstitute(props: RowComponentSchema): RowVO {
    const validated = rowComponentSchema.parse(props);
    return new RowVO(validated);
  }

  equals(other: RowVO): boolean {
    if (!(other instanceof RowVO)) return false;
    return lodash.isEqual(this.props, other.props);
  }

  toJSON(): RowComponentSchema {
    return { ...this.props };
  }
}
