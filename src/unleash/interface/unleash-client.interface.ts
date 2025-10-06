import { ModuleMetadata } from '@nestjs/common';

import { UnleashClientConstructorInterface } from './unleash-client-constructor.interface';

/**
 * Asynchronous options for configuring the Unleash client module.
 */
export interface UnleashClientModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  /**
   * Factory function that returns a configuration object for the Unleash client.
   */
  useFactory?: (
    ...args: any[]
  ) => Promise<UnleashClientConstructorInterface> | UnleashClientConstructorInterface;
  /**
   * A list of providers to be injected into the `useFactory` function.
   */
  inject?: any[];
  /**
   * A unique name for the Unleash client instance, useful when you have multiple instances.
   */
  name?: string;
}
