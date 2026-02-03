import {
  appBarComponentSchema,
  AppBarComponentSchema,
} from '@/shared/schemas/componentSchema/appBarComponentSchema';
import { isEqual } from 'lodash';

export class AppBarVO {
  private constructor(private readonly props: AppBarComponentSchema) {}

  static create(props?: Partial<Omit<AppBarComponentSchema, 'type'>>): AppBarVO {
    const validated = appBarComponentSchema.parse({
      type: 'appBar',
      ...props,
    });
    return new AppBarVO(validated);
  }

  static createJSON(props?: Partial<Omit<AppBarComponentSchema, 'type'>>): AppBarComponentSchema {
    return AppBarVO.create(props).toJSON();
  }

  static reconstitute(props: AppBarComponentSchema): AppBarVO {
    const validated = appBarComponentSchema.parse(props);
    return new AppBarVO(validated);
  }

  equals(other: AppBarVO): boolean {
    if (!(other instanceof AppBarVO)) return false;
    return isEqual(this.props, other.props);
  }

  toJSON(): AppBarComponentSchema {
    return { ...this.props };
  }
}
