import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { Context } from 'unleash-client';

import { UnleashGuard } from '../guards/unleash.guard';

export const UNLEASH_TOGGLE_KEY = 'UnleashToggleName';
export const UNLEASH_TOGGLE_CONTEXT = 'UnleashToggleContext';

/**
 * Decorator that marks a route as being controlled by a feature toggle.
 *
 * @param {string} toggleName - The name of the feature toggle to check.
 * @param {Context} context - Additional Context of the feature toggle to check.
 */
export const UnleashToggle = (toggleName: string, context?: Context) => {
  return applyDecorators(
    SetMetadata(UNLEASH_TOGGLE_KEY, toggleName),
    SetMetadata(UNLEASH_TOGGLE_CONTEXT, context),
    UseGuards(UnleashGuard),
  );
};
