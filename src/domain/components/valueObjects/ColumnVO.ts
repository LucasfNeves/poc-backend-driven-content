import {
  columnComponentSchema,
  ColumnComponentSchema,
} from '@/shared/schemas/componentSchema/columnComponentSchema';
import lodash from 'lodash';

export class ColumnVO {
  private constructor(private readonly props: ColumnComponentSchema) {}

  static create(props?: Partial<Omit<ColumnComponentSchema, 'type'>>): ColumnVO {
    const validated = columnComponentSchema.parse({
      type: 'column',
      ...props,
    });
    return new ColumnVO(validated);
  }

  static createJSON(props?: Partial<Omit<ColumnComponentSchema, 'type'>>): ColumnComponentSchema {
    return ColumnVO.create(props).toJSON();
  }

  static reconstitute(props: ColumnComponentSchema): ColumnVO {
    const validated = columnComponentSchema.parse(props);
    return new ColumnVO(validated);
  }

  equals(other: ColumnVO): boolean {
    if (!(other instanceof ColumnVO)) return false;
    return lodash.isEqual(this.props, other.props);
  }

  toJSON(): ColumnComponentSchema {
    return { ...this.props };
  }
}
