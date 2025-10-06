import { SetMetadata } from '@nestjs/common';

export const UNLEASH_TOGGLE_KEY = 'UnleashToggle';

export const UnleashToggle = (name: string) =>
  SetMetadata(UNLEASH_TOGGLE_KEY, name);
