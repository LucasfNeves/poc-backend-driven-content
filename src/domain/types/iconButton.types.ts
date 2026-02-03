import { BaseComponent, ActionCallback } from './common.types';
import { IconComponent } from './icon.types';

export interface IconButtonComponent extends BaseComponent {
  type: 'iconButton';
  icon: IconComponent;
  onPressed?: ActionCallback;
}
