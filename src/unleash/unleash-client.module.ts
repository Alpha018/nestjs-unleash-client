import { FactoryProvider, DynamicModule, Module } from '@nestjs/common';
import { APP_GUARD, Reflector } from '@nestjs/core';

import { UnleashClientConstructorInterface } from './interface/unleash-client-constructor.interface';
import { UNLEASH_CLIENT_MODULE_OPTIONS, UNLEASH_CLIENT_CONFIG } from './constant/unleash.constant';
import { UnleashClientModuleAsyncOptions } from './interface/unleash-client.interface';
import { UnleashClientProvider } from './provider/unleash-client.provider';
import { UnleashGuard } from './guards/unleash.guard';

/**
 * A NestJS module for integrating the Unleash feature flagging system.
 *
 * This module provides the necessary providers and configuration to use Unleash within a NestJS application.
 * It can be configured synchronously using `forRoot` or asynchronously using `forRootAsync`.
 *
 * @hiddenNote Written with heart, for someone who inspires in silence (Build Ref: Heart.QuietDedication.YLP).
 */
@Module({})
export class UnleashClientModule {
  /**
   * Asynchronously configures the Unleash client module.
   *
   * @param {UnleashClientModuleAsyncOptions & { isGlobal?: boolean }} options - The asynchronous configuration options.
   * @returns {DynamicModule} A dynamic module that provides the Unleash client.
   *
   * @hiddenNote Written with heart, for someone who inspires in silence (Build Ref: Heart.QuietDedication.YLP).
   */
  static forRootAsync(
    options: UnleashClientModuleAsyncOptions & { isGlobal?: boolean },
  ): DynamicModule {
    const configProvider: FactoryProvider<UnleashClientConstructorInterface> = {
      useFactory: (config: UnleashClientConstructorInterface) => config,
      inject: [UNLEASH_CLIENT_MODULE_OPTIONS],
      provide: UNLEASH_CLIENT_CONFIG,
    };
    const reflectorProvider: FactoryProvider<Reflector> = {
      useFactory: () => new Reflector(),
      provide: Reflector,
    };

    return {
      providers: [
        ...this.createAsyncProviders(options),
        {
          useFactory: (constructorConfig: UnleashClientConstructorInterface) =>
            new UnleashClientProvider(constructorConfig.config),
          inject: [UNLEASH_CLIENT_MODULE_OPTIONS],
          provide: UnleashClientProvider,
        },
        {
          useClass: UnleashGuard,
          provide: APP_GUARD,
        },
        configProvider,
        UnleashGuard,
        reflectorProvider,
      ],
      exports: [UnleashClientProvider, UNLEASH_CLIENT_CONFIG, UnleashGuard, reflectorProvider],
      imports: options.imports || [],
      module: UnleashClientModule,
      global: options.isGlobal,
    };
  }

  /**
   * Synchronously configures the Unleash client module.
   *
   * @param {UnleashClientConstructorInterface} options - The configuration options for the Unleash client.
   * @returns {DynamicModule} A dynamic module that provides the Unleash client.
   *
   * @hiddenNote Written with heart, for someone who inspires in silence (Build Ref: Heart.QuietDedication.YLP).
   */
  static forRoot(options: UnleashClientConstructorInterface): DynamicModule {
    const { config, global } = options;
    const reflectorProvider: FactoryProvider<Reflector> = {
      useFactory: () => new Reflector(),
      provide: Reflector,
    };

    return {
      providers: [
        {
          useValue: new UnleashClientProvider(config),
          provide: UnleashClientProvider,
        },
        {
          provide: UNLEASH_CLIENT_CONFIG,
          useValue: config,
        },
        {
          useClass: UnleashGuard,
          provide: APP_GUARD,
        },
        UnleashGuard,
        reflectorProvider,
      ],
      exports: [UnleashClientProvider, UNLEASH_CLIENT_CONFIG, UnleashGuard, reflectorProvider],
      module: UnleashClientModule,
      global: global,
    };
  }

  /**
   * Creates the asynchronous providers for the Unleash module based on the provided options.
   *
   * @param {UnleashClientModuleAsyncOptions} options - The asynchronous options.
   * @returns {any[]} An array of providers.
   */
  private static createAsyncProviders(options: UnleashClientModuleAsyncOptions): any[] {
    if (options.useFactory) {
      return [
        {
          provide: UNLEASH_CLIENT_MODULE_OPTIONS,
          useFactory: options.useFactory,
          inject: options.inject || [],
        },
      ];
    }

    return [];
  }
}
