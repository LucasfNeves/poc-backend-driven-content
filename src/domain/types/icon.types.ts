import { BaseComponent, Color, IconType } from './common.types';

export interface IconComponent extends BaseComponent {
  type: 'icon';
  iconType?: IconType;
  icon: string;
  size?: number;
  color?: Color;
}
