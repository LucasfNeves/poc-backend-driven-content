import { BaseComponent, Color } from './common.types';

export interface TextStyle {
  fontSize?: number;
  fontWeight?: string;
  color?: Color;
}

export interface TextComponent extends BaseComponent {
  type: 'text';
  data: string;
  style?: TextStyle;
}
