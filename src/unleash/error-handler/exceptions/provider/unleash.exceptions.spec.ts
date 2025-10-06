import { HttpStatus } from '@nestjs/common';

import { UnexpectedUnleashException, NotFoundUnleashException } from './unleash.exceptions';
import { UnleashErrorCode } from '../code/unleash.code';

describe('Unleash Exceptions', () => {
  describe('UnexpectedUnleashException', () => {
    it('should create an instance with the correct properties', () => {
      const exception = new UnexpectedUnleashException();

      expect(exception.getStatus()).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
      expect(exception.getResponse()).toEqual({
        code: UnleashErrorCode.UNEXPECTED_UNLEASH_ERROR,
        message: 'Unexpected error in Unleash Service',
        options: undefined,
      });
    });
  });

  describe('NotFoundUnleashException', () => {
    it('should create an instance with the correct properties', () => {
      const exception = new NotFoundUnleashException();

      expect(exception.getStatus()).toBe(HttpStatus.NOT_FOUND);
      expect(exception.getResponse()).toEqual({
        code: UnleashErrorCode.NOT_FOUND_UNLEASH_ERROR,
        message: 'Not found feature in Unleash',
        options: undefined,
      });
    });
  });
});
