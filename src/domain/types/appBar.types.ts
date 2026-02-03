import { BaseComponent, Color, IconTheme, TextAlign } from './common.types';
import { TextComponent } from './text.types';
import { ImageComponent } from './image.types';
import { IconButtonComponent } from './iconButton.types';

export interface AppBarComponent extends BaseComponent {
  type: 'appBar';
  title?: TextComponent | ImageComponent;
  backgroundColor?: Color;
  foregroundColor?: Color;
  elevation?: number;
  centerTitle?: boolean;
  leading?: IconButtonComponent;
  actions?: IconButtonComponent[];
  shadowColor?: Color;
  surfaceTintColor?: Color;
  iconTheme?: IconTheme;
  actionsIconTheme?: IconTheme;
  toolbarHeight?: number;
  leadingWidth?: number;
  titleSpacing?: number;
  titleTextAlign?: TextAlign;
}
