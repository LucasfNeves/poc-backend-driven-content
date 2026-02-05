import {
  spacerComponentSchema,
  SpacerComponentSchema,
} from '@/shared/schemas/componentSchema/spacerComponentSchema';
import lodash from 'lodash';

export class SpacerVO {
  private constructor(private readonly props: SpacerComponentSchema) {}

  static create(): SpacerVO {
    const validated = spacerComponentSchema.parse({
      type: 'spacer',
    });
    return new SpacerVO(validated);
  }

  static createJSON(): SpacerComponentSchema {
    return SpacerVO.create().toJSON();
  }

  static reconstitute(props: SpacerComponentSchema): SpacerVO {
    const validated = spacerComponentSchema.parse(props);
    return new SpacerVO(validated);
  }

  equals(other: SpacerVO): boolean {
    if (!(other instanceof SpacerVO)) return false;
    return lodash.isEqual(this.props, other.props);
  }

  toJSON(): SpacerComponentSchema {
    return { ...this.props };
  }
}
