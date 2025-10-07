import { ModuleMetadata } from '@nestjs/common';

import { UnleashClientConstructorInterface } from './unleash-client-constructor.interface';

/**
 * Asynchronous options for configuring the Unleash client module.
 */
export interface UnleashClientModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  /**
   * Factory function that returns the Unleash configuration object.
   */
  useFactory?: (
    ...args: any[]
  ) => Promise<UnleashClientConstructorInterface> | UnleashClientConstructorInterface;
  /**
   * If `true`, the module will be registered as a global module.
   */
  isGlobal?: boolean;
  /**
   * A list of providers to be injected into the `useFactory` function.
   */
  inject?: any[];
}
