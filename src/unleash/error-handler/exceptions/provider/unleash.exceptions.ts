import { HttpStatus } from '@nestjs/common';

import { UnleashErrorCode } from '../code/unleash.code';
import { BaseException } from '../base.exception';

/**
 * Base exception for Unleash-related errors.
 */
export class UnleashException extends BaseException {}

/**
 * Represents an unexpected error that occurred within the Unleash service.
 */
export class UnexpectedUnleashException extends UnleashException {
  static override readonly code = UnleashErrorCode.UNEXPECTED_UNLEASH_ERROR;
  static override readonly message = 'Unexpected error in Unleash Service';
  static override readonly status = HttpStatus.INTERNAL_SERVER_ERROR;
}

/**
 * Represents an error where a requested feature was not found in Unleash.
 */
export class NotFoundUnleashException extends UnleashException {
  static override readonly code = UnleashErrorCode.NOT_FOUND_UNLEASH_ERROR;
  static override readonly message = 'Not found feature in Unleash';
  static override readonly status = HttpStatus.NOT_FOUND;
}
