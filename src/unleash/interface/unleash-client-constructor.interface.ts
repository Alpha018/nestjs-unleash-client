import { UnleashConfig } from 'unleash-client';

/**
 * Defines the structure for the Unleash client constructor, specifying the configuration and registration options.
 */
export interface UnleashClientConstructorInterface {
  /**
   * The core configuration object for the Unleash client, based on the `unleash-client` library's `UnleashConfig`.
   */
  config: UnleashConfig;
}
