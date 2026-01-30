export interface BaseComponent {
  type: string;
  id?: string;
}

export interface TextComponent extends BaseComponent {
  type: 'text';
  data: string;
  style?: {
    fontSize?: number;
    fontWeight?: string;
    color?: string;
  };
}

export interface ImageComponent extends BaseComponent {
  type: 'image';
  src: string;
  width?: number;
  height?: number;
  fit?: 'contain' | 'cover' | 'fill' | 'fitWidth' | 'fitHeight' | 'none' | 'scaleDown';
}

export interface IconComponent extends BaseComponent {
  type: 'icon';
  iconType?: 'material' | 'cupertino';
  icon: string;
  size?: number;
  color?: string;
}

export interface IconButtonComponent extends BaseComponent {
  type: 'iconButton';
  icon: IconComponent;
  onPressed?: {
    action?: string;
    route?: string;
    params?: Record<string, unknown>;
  };
}

export interface AppBarComponent extends BaseComponent {
  type: 'appBar';
  title?: TextComponent | ImageComponent;
  backgroundColor?: string;
  foregroundColor?: string;
  elevation?: number;
  centerTitle?: boolean;
  leading?: IconButtonComponent;
  actions?: IconButtonComponent[];
}

export type Component =
  | TextComponent
  | ImageComponent
  | IconComponent
  | IconButtonComponent
  | AppBarComponent;
