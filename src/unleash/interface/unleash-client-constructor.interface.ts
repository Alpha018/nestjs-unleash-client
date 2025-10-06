import { UnleashConfig } from 'unleash-client';

export interface UnleashClientConstructorInterface {
  config: UnleashConfig;
  global?: boolean;
}
