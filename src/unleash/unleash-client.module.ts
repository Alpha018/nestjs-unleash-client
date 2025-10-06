import { FactoryProvider, DynamicModule, Module } from '@nestjs/common';
import { APP_GUARD, Reflector } from '@nestjs/core';

import { UNLEASH_CLIENT_MODULE_OPTIONS, UNLEASH_CLIENT_CONFIG } from './constant/unleash.constant';
import { UnleashClientConstructorInterface } from './interface/unleash-client-constructor.interface';
import { UnleashClientModuleAsyncOptions } from './interface/unleash-client.interface';
import { UnleashClientProvider } from './provider/unleash-client.provider';
import { UnleashGuard } from './guards/unleash.guard';

@Module({})
export class UnleashClientModule {
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
