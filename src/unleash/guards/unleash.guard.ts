import { ExecutionContext, CanActivate, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { UnexpectedUnleashException } from '../error-handler/exceptions/provider/atg.exceptions';
import { UnleashClientProvider } from '../provider/unleash-client.provider';
import { UNLEASH_TOGGLE_KEY } from '../decorators/unleash.decorator';

@Injectable()
export class UnleashGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly unleashClientProvider: UnleashClientProvider,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const toggleName = this.reflector.get<string>(
      UNLEASH_TOGGLE_KEY,
      context.getHandler(),
    );

    if (!toggleName) {
      return true;
    }

    let data: boolean;
    try {
      data = this.unleashClientProvider.isEnabled(toggleName);
    } catch {
      throw new UnexpectedUnleashException();
    }

    return data;
  }
}
