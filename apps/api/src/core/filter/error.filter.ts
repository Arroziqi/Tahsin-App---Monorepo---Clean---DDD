import { Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { ZodError } from 'zod';
import { HttpException } from '@nestjs/common';
import { Response } from 'express';
import { ErrorEntity } from '../domain/entities/error.entity';

@Catch(ZodError, HttpException)
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();

    if (exception instanceof ZodError) {
      response.status(400).json({
        errors: 'validation error',
      });
    } else if (exception instanceof HttpException) {
      response.status(exception.getStatus()).json({
        errors: exception.getResponse(),
      });
    } else {
      response.status(500).json({
        errors: exception.message,
      });
    }

   
  }
}
