export interface BaseComponent {
  type: string;
  id?: string;
}

export type Color = string | number;

export type BoxFit = 'contain' | 'cover' | 'fill' | 'fitWidth' | 'fitHeight' | 'none' | 'scaleDown';

export type TextAlign = 'left' | 'right' | 'center' | 'justify' | 'start' | 'end';

export type IconType = 'material' | 'cupertino';

export interface IconTheme {
  color?: Color;
  size?: number;
  opacity?: number;
}

export interface ActionCallback {
  action?: string;
  route?: string;
  params?: Record<string, unknown>;
}
