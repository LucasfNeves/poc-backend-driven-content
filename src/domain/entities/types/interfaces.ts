import { ScreenName } from '@/domain/value-objects';

export interface ScreenConfig {
  scaffold?: {
    appBar?: AppBarComponent;
    body?: unknown;
  };
  components?: unknown[];
  [key: string]: unknown;
}
export interface ScreenProps {
  id: string;
  name: ScreenName;
  config: ScreenConfig | unknown;
  version: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ScreenPersistenceData {
  id: string;
  name: string;
  config: ScreenConfig | unknown;
  version: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateScreenData {
  name: ScreenName;
  config: ScreenConfig | unknown;
  version: number;
  isActive: boolean;
}
