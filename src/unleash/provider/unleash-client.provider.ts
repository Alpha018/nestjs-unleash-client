import { OnModuleDestroy, OnModuleInit, Injectable, Logger } from '@nestjs/common';
import { UnleashConfig, Unleash, Context } from 'unleash-client';
import { FeatureInterface } from 'unleash-client/lib/feature';

@Injectable()
export class UnleashClientProvider implements OnModuleDestroy, OnModuleInit {
  get unleashClient(): Unleash {
    return this._unleashClient;
  }

  private readonly logger = new Logger(UnleashClientProvider.name);
  private _unleashClient: Unleash;

  /**
   * Initializes a new instance of the UnleashClientProvider class.
   *
   * @param {UnleashConfig} unleashConfig - The configuration for the Unleash client.
   */
  constructor(private readonly unleashConfig: UnleashConfig) {}

  onModuleInit() {
    this._unleashClient = new Unleash({
      ...this.unleashConfig,
    });

    this._unleashClient.on('error', (err) => {
      this.logger.error(err.message, err.stack);
    });

    this._unleashClient.on('warn', (msg) => {
      this.logger.warn(msg);
    });
  }

  /**
   * Retrieves the definition of a specific feature toggle.
   *
   * @param {string} toggleName - The name of the feature toggle to retrieve.
   * @returns {any} - The feature toggle definition.
   */
  getFeatureToggleDefinition(toggleName: string): FeatureInterface | undefined {
    return this._unleashClient.getFeatureToggleDefinition(toggleName);
  }

  /**
   * Checks if a feature toggle is enabled.
   *
   * @param {string} name - The name of the feature toggle.
   * @param {Context | undefined} context - An optional context object for more advanced strategies.
   * @returns {boolean} - `true` if the feature is enabled, otherwise `false`.
   */
  isEnabled(name: string, context?: Context): boolean {
    return this._unleashClient.isEnabled(name, context);
  }

  onModuleDestroy() {
    this._unleashClient.destroy();
  }
}
