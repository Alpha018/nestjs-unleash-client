import { ExecutionContext, CanActivate, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { UnexpectedUnleashException } from '../error-handler/exceptions/provider/unleash.exceptions';
import { UnleashClientProvider } from '../provider/unleash-client.provider';
import { UNLEASH_TOGGLE_KEY } from '../decorators/unleash.decorator';

@Injectable()
export class UnleashGuard implements CanActivate {
  /**
   * Initializes a new instance of the UnleashGuard class.
   *
   * @param {Reflector} reflector - The reflector service to access metadata.
   * @param {UnleashClientProvider} unleashClientProvider - The provider for the Unleash client.
   */
  constructor(
    private readonly reflector: Reflector,
    private readonly unleashClientProvider: UnleashClientProvider,
  ) {}

  /**
   * Determines whether the current request is allowed to proceed based on a feature toggle.
   *
   * @param {ExecutionContext} context - The execution context of the current request.
   * @returns {boolean} - `true` if the feature is enabled or no toggle is specified; otherwise, `false`.
   */
  canActivate(context: ExecutionContext): boolean {
    const toggleName = this.reflector.get<string>(UNLEASH_TOGGLE_KEY, context.getHandler());

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
