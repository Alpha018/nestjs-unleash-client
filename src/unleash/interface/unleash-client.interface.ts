import { ModuleMetadata } from '@nestjs/common';

import { UnleashClientConstructorInterface } from './unleash-client-constructor.interface';

export interface UnleashClientModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  useFactory?: (
    ...args: any[]
  ) => Promise<UnleashClientConstructorInterface> | UnleashClientConstructorInterface;
  inject?: any[];
  name?: string;
}
