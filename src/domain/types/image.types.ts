import { BaseComponent, BoxFit } from './common.types';

export interface ImageComponent extends BaseComponent {
  type: 'image';
  src: string;
  width?: number;
  height?: number;
  fit?: BoxFit;
}
