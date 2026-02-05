import {
  scaffoldComponentSchema,
  ScaffoldComponentSchema,
} from '@/shared/schemas/componentSchema/scaffoldComponentSchema';
import lodash from 'lodash';

export class ScaffoldVO {
  private constructor(private readonly props: ScaffoldComponentSchema) {}

  static create(props?: Partial<Omit<ScaffoldComponentSchema, 'type'>>): ScaffoldVO {
    const validated = scaffoldComponentSchema.parse({
      type: 'scaffold',
      ...props,
    });
    return new ScaffoldVO(validated);
  }

  static createJSON(
    props?: Partial<Omit<ScaffoldComponentSchema, 'type'>>,
  ): ScaffoldComponentSchema {
    return ScaffoldVO.create(props).toJSON();
  }

  static reconstitute(props: ScaffoldComponentSchema): ScaffoldVO {
    const validated = scaffoldComponentSchema.parse(props);
    return new ScaffoldVO(validated);
  }

  equals(other: ScaffoldVO): boolean {
    if (!(other instanceof ScaffoldVO)) return false;
    return lodash.isEqual(this.props, other.props);
  }

  toJSON(): ScaffoldComponentSchema {
    return { ...this.props };
  }
}
