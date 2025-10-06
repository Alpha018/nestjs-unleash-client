import { SetMetadata } from '@nestjs/common';

export const UNLEASH_TOGGLE_KEY = 'UnleashToggle';

/**
 * Decorator that marks a route as being controlled by a feature toggle.
 *
 * @param {string} name - The name of the feature toggle to check.
 */
export const UnleashToggle = (name: string) => SetMetadata(UNLEASH_TOGGLE_KEY, name);
