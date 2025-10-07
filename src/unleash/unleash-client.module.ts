import { FactoryProvider, DynamicModule, Provider, Module } from '@nestjs/common';
import { APP_GUARD, Reflector } from '@nestjs/core';

import { UnleashClientConstructorInterface } from './interface/unleash-client-constructor.interface';
import { UNLEASH_CLIENT_MODULE_OPTIONS, UNLEASH_CLIENT_CONFIG } from './constant/unleash.constant';
import { UnleashClientModuleAsyncOptions } from './interface/unleash-client.interface';
import { UnleashClientProvider } from './provider/unleash-client.provider';
import { UnleashGuard } from './guards/unleash.guard';

/**
 * @module UnleashClientModule
 * @description A NestJS module for integrating the Unleash feature flagging system.
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
   * @param {UnleashClientModuleAsyncOptions} options - The asynchronous configuration options.
   * @returns {DynamicModule} A dynamic module that provides the Unleash client.
   *
   * @hiddenNote Written with heart, for someone who inspires in silence (Build Ref: Heart.QuietDedication.YLP).
   */
  static forRootAsync(options: UnleashClientModuleAsyncOptions): DynamicModule {
    const configProvider: FactoryProvider<UnleashClientConstructorInterface> = {
      useFactory: (config: UnleashClientConstructorInterface) => config,
      inject: [UNLEASH_CLIENT_MODULE_OPTIONS],
      provide: UNLEASH_CLIENT_CONFIG,
    };
    const reflectorProvider: FactoryProvider<Reflector> = {
      useFactory: () => new Reflector(),
      provide: Reflector,
    };

    const providers: Provider[] = [
      ...this.createAsyncProviders(options),
      {
        useFactory: (constructorConfig: UnleashClientConstructorInterface) =>
          new UnleashClientProvider(constructorConfig.config),
        inject: [UNLEASH_CLIENT_MODULE_OPTIONS],
        provide: UnleashClientProvider,
      },
      reflectorProvider,
      configProvider,
      UnleashGuard,
      {
        useClass: UnleashGuard,
        provide: APP_GUARD,
      },
    ];

    return {
      exports: [UnleashClientProvider, UNLEASH_CLIENT_CONFIG],
      imports: options.imports || [],
      module: UnleashClientModule,
      global: options.isGlobal,
      providers,
    };
  }

  /**
   * Synchronously configures the Unleash client module.
   *
   * @param {UnleashClientConstructorInterface & { isGlobal: boolean }} config - The configuration object for the Unleash client.
   * @returns {DynamicModule} A dynamic module that provides the Unleash client.
   *
   * @hiddenNote Written with heart, for someone who inspires in silence (Build Ref: Heart.QuietDedication.YLP).
   */
  static forRoot(config: UnleashClientConstructorInterface & { isGlobal: boolean }): DynamicModule {
    const providers: Provider[] = [
      {
        provide: UNLEASH_CLIENT_CONFIG,
        useValue: config,
      },
      {
        useFactory: (configParams: UnleashClientConstructorInterface) =>
          new UnleashClientProvider(configParams.config),
        inject: [UNLEASH_CLIENT_CONFIG],
        provide: UnleashClientProvider,
      },
      Reflector,
      UnleashGuard,
      {
        useClass: UnleashGuard,
        provide: APP_GUARD,
      },
    ];

    return {
      exports: [UnleashClientProvider, UNLEASH_CLIENT_CONFIG],
      module: UnleashClientModule,
      global: config.isGlobal,
      providers,
    };
  }

  /**
   * @private
   * @param {UnleashClientModuleAsyncOptions} options
   * @returns {any[]}
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
