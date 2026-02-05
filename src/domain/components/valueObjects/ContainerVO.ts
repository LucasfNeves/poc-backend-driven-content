import {
  containerComponentSchema,
  ContainerComponentSchema,
} from '@/shared/schemas/componentSchema/containerComponentSchema';
import lodash from 'lodash';

export class ContainerVO {
  private constructor(private readonly props: ContainerComponentSchema) {}

  static create(props?: Partial<Omit<ContainerComponentSchema, 'type'>>): ContainerVO {
    const validated = containerComponentSchema.parse({
      type: 'container',
      ...props,
    });
    return new ContainerVO(validated);
  }

  static createJSON(
    props?: Partial<Omit<ContainerComponentSchema, 'type'>>,
  ): ContainerComponentSchema {
    return ContainerVO.create(props).toJSON();
  }

  static reconstitute(props: ContainerComponentSchema): ContainerVO {
    const validated = containerComponentSchema.parse(props);
    return new ContainerVO(validated);
  }

  equals(other: ContainerVO): boolean {
    if (!(other instanceof ContainerVO)) return false;
    return lodash.isEqual(this.props, other.props);
  }

  toJSON(): ContainerComponentSchema {
    return { ...this.props };
  }
}
