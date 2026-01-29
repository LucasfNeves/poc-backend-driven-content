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
    height?: number;
  };
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
  title?: TextComponent;
  backgroundColor?: string;
  foregroundColor?: string;
  elevation?: number;
  centerTitle?: boolean;
  leading?: IconButtonComponent;
  actions?: IconButtonComponent[];
}

export interface ScaffoldComponent extends BaseComponent {
  type: 'scaffold';
  backgroundColor?: string;
  appBar?: AppBarComponent;
  body?: unknown;
}

export type Component =
  | TextComponent
  | IconComponent
  | IconButtonComponent
  | AppBarComponent
  | ScaffoldComponent;
