import { HttpExceptionOptions } from '@nestjs/common/exceptions/http.exception';
import { HttpException, HttpStatus } from '@nestjs/common';

export abstract class BaseException extends HttpException {
  static status: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
  static message: string;
  static code: string;

  constructor(options?: HttpExceptionOptions | undefined) {
    const { message, status, code } = new.target as typeof BaseException;
    super({ message, options, code }, status);
  }
}
