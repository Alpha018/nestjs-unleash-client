import { HttpStatus } from '@nestjs/common';

import { UnleashErrorCode } from '../code/unleash.code';
import { BaseException } from '../base.exception';

export class UnleashException extends BaseException {}

export class UnexpectedUnleashException extends UnleashException {
  static override readonly code = UnleashErrorCode.UNEXPECTED_UNLEASH_ERROR;
  static override readonly message = 'Unexpected error in Unleash Service';
  static override readonly status = HttpStatus.INTERNAL_SERVER_ERROR;
}

export class NotFoundUnleashException extends UnleashException {
  static override readonly code = UnleashErrorCode.NOT_FOUND_UNLEASH_ERROR;
  static override readonly message = 'Not found feature in Unleash';
  static override readonly status = HttpStatus.NOT_FOUND;
}
