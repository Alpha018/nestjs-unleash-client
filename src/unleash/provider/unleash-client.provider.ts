import {
  OnModuleDestroy,
  OnModuleInit,
  Injectable,
  Logger,
} from '@nestjs/common';
import { UnleashConfig, Unleash, Context } from 'unleash-client';

@Injectable()
export class UnleashClientProvider implements OnModuleDestroy, OnModuleInit {
  get unleashClient(): Unleash {
    return this._unleashClient;
  }

  private readonly logger = new Logger(UnleashClientProvider.name);
  private _unleashClient: Unleash;

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

  getFeatureToggleDefinition(toggleName: string) {
    return this._unleashClient.getFeatureToggleDefinition(toggleName);
  }

  isEnabled(name: string, context?: Context): boolean {
    return this._unleashClient.isEnabled(name, context);
  }

  onModuleDestroy() {
    this._unleashClient.destroy();
  }
}
