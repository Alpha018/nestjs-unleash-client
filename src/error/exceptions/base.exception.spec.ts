import { HttpStatus } from '@nestjs/common';

import { BaseException } from './base.exception';

class TestException extends BaseException {
  static override message = 'This is a test exception';
  static override status = HttpStatus.BAD_REQUEST;
  static override code = 'TEST_CODE';
}

class AnotherTestException extends BaseException {
  static override message = 'Another test exception';
  static override code = 'ANOTHER_TEST_CODE';
}

describe('BaseException', () => {
  it('should create an instance with the correct status, message, and code', () => {
    try {
      throw new TestException();
    } catch (error) {
      expect(error).toBeInstanceOf(TestException);
      expect(error.getStatus()).toBe(HttpStatus.BAD_REQUEST);
      expect(error.getResponse()).toEqual({
        message: 'This is a test exception',
        options: undefined,
        code: 'TEST_CODE',
      });
    }
  });

  it('should use default status if not provided', () => {
    try {
      throw new AnotherTestException();
    } catch (error) {
      expect(error).toBeInstanceOf(AnotherTestException);
      expect(error.getStatus()).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
      expect(error.getResponse()).toEqual({
        message: 'Another test exception',
        code: 'ANOTHER_TEST_CODE',
        options: undefined,
      });
    }
  });

  it('should include options in the response when provided', () => {
    const options = { description: 'Some extra details' };
    try {
      throw new TestException(options);
    } catch (error) {
      expect(error).toBeInstanceOf(TestException);
      expect(error.getStatus()).toBe(HttpStatus.BAD_REQUEST);
      expect(error.getResponse()).toEqual({
        message: 'This is a test exception',
        code: 'TEST_CODE',
        options: options,
      });
    }
  });
});
