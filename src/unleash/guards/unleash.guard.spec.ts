import { TestingModule, Test } from '@nestjs/testing';
import { ExecutionContext } from '@nestjs/common';
import { createMock } from '@golevelup/ts-jest';
import { Reflector } from '@nestjs/core';

import { UnleashClientProvider } from '../provider/unleash-client.provider';
import { UNLEASH_TOGGLE_KEY } from '../decorators/unleash.decorator';
import { UnexpectedUnleashException } from '../../error/exceptions';
import { UnleashGuard } from './unleash.guard';

describe('UnleashGuard', () => {
  let guard: UnleashGuard;
  let reflector: Reflector;
  let unleashClientProvider: UnleashClientProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UnleashGuard,
        {
          useValue: {
            get: jest.fn(),
          },
          provide: Reflector,
        },
        {
          useValue: {
            isEnabled: jest.fn(),
          },
          provide: UnleashClientProvider,
        },
      ],
    }).compile();

    guard = module.get<UnleashGuard>(UnleashGuard);
    reflector = module.get<Reflector>(Reflector);
    unleashClientProvider = module.get<UnleashClientProvider>(UnleashClientProvider);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  it('should return true when toggle is enabled', () => {
    const context = createMock<ExecutionContext>();
    jest.spyOn(reflector, 'get').mockReturnValue('test-toggle');
    jest.spyOn(unleashClientProvider, 'isEnabled').mockReturnValue(true);

    expect(guard.canActivate(context)).toBe(true);
    expect(reflector.get).toHaveBeenCalledWith(UNLEASH_TOGGLE_KEY, context.getHandler());
    expect(unleashClientProvider.isEnabled).toHaveBeenCalledWith('test-toggle', 'test-toggle');
  });

  it('should return false when toggle is disabled', () => {
    const context = createMock<ExecutionContext>();
    jest.spyOn(reflector, 'get').mockReturnValue('test-toggle');
    jest.spyOn(unleashClientProvider, 'isEnabled').mockReturnValue(false);

    expect(guard.canActivate(context)).toBe(false);
  });

  it('should throw UnexpectedUnleashException when isEnabled fails', () => {
    const context = createMock<ExecutionContext>();
    jest.spyOn(reflector, 'get').mockReturnValue('test-toggle');
    jest.spyOn(unleashClientProvider, 'isEnabled').mockImplementation(() => {
      throw new Error();
    });

    expect(() => guard.canActivate(context)).toThrow(UnexpectedUnleashException);
  });
});
