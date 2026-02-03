export * from './common.types';

export * from './text.types';
export * from './image.types';
export * from './icon.types';
export * from './iconButton.types';
export * from './appBar.types';

import { TextComponent } from './text.types';
import { ImageComponent } from './image.types';
import { IconComponent } from './icon.types';
import { IconButtonComponent } from './iconButton.types';
import { AppBarComponent } from './appBar.types';

export type Component =
  | TextComponent
  | ImageComponent
  | IconComponent
  | IconButtonComponent
  | AppBarComponent;
