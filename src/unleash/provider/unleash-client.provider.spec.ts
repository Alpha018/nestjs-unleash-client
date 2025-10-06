import { UnleashConfig, Unleash } from 'unleash-client';
import { Logger } from '@nestjs/common';

import { UnleashClientProvider } from './unleash-client.provider';

jest.mock('unleash-client', () => ({
  ...jest.requireActual('unleash-client'),
  Unleash: jest.fn().mockImplementation(() => ({
    getFeatureToggleDefinition: jest.fn(),
    isEnabled: jest.fn(),
    destroy: jest.fn(),
    on: jest.fn(),
  })),
}));

describe('UnleashClientProvider', () => {
  let provider: UnleashClientProvider;
  let unleashClient: Unleash;
  let loggerErrorSpy: jest.SpyInstance;
  let loggerWarnSpy: jest.SpyInstance;

  const unleashConfig: UnleashConfig = {
    url: 'http://localhost:4242/api',
    instanceId: 'test-instance',
    appName: 'test-app',
  };

  beforeEach(() => {
    loggerErrorSpy = jest.spyOn(Logger.prototype, 'error').mockImplementation();
    loggerWarnSpy = jest.spyOn(Logger.prototype, 'warn').mockImplementation();

    provider = new UnleashClientProvider(unleashConfig);
    provider.onModuleInit();
    unleashClient = provider.unleashClient;
  });

  afterEach(() => {
    provider.onModuleDestroy();
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });

  it('should initialize Unleash client on module init', () => {
    expect(Unleash).toHaveBeenCalledWith(unleashConfig);
    expect(unleashClient).toBeDefined();
  });

  it('should register error and warn listeners', () => {
    expect(unleashClient.on).toHaveBeenCalledWith(
      'error',
      expect.any(Function),
    );
    expect(unleashClient.on).toHaveBeenCalledWith('warn', expect.any(Function));
  });

  it('should log error on unleash error event', () => {
    const error = new Error('test error');
    const errorCallback = jest
      .mocked(unleashClient.on)
      .mock.calls.find((call) => call[0] === 'error')![1] as (
      err: Error,
    ) => void;

    errorCallback(error);

    expect(loggerErrorSpy).toHaveBeenCalledWith(error.message, error.stack);
  });

  it('should log warning on unleash warn event', () => {
    const message = 'test warning';
    const warnCallback = jest
      .mocked(unleashClient.on)
      .mock.calls.find((call) => call[0] === 'warn')![1] as (
      msg: string,
    ) => void;

    warnCallback(message);

    expect(loggerWarnSpy).toHaveBeenCalledWith(message);
  });

  it('should call getFeatureToggleDefinition on unleash client', () => {
    const toggleName = 'test-toggle';
    provider.getFeatureToggleDefinition(toggleName);
    expect(unleashClient.getFeatureToggleDefinition).toHaveBeenCalledWith(
      toggleName,
    );
  });

  it('should call isEnabled on unleash client', () => {
    const toggleName = 'test-toggle';
    const context = { userId: '123' };
    provider.isEnabled(toggleName, context);
    expect(unleashClient.isEnabled).toHaveBeenCalledWith(toggleName, context);
  });

  it('should destroy unleash client on module destroy', () => {
    provider.onModuleDestroy();
    expect(unleashClient.destroy).toHaveBeenCalled();
  });
});
