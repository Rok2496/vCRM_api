import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { QueryFailedError } from 'typeorm';

@Catch(HttpException, QueryFailedError)
export class DatabaseExceptionFilter implements ExceptionFilter {
  private extractQueryFailedError(exception: any): QueryFailedError | null {
    if (exception instanceof QueryFailedError) {
      return exception;
    }
    if (exception instanceof HttpException) {
      const cause = (exception as any).cause;
      if (cause instanceof QueryFailedError) {
        return cause;
      }
      const response = (exception as any).response;
      if (response instanceof QueryFailedError) {
        return response;
      }
      if (response instanceof HttpException) {
        const nestedCause = (response as any).cause;
        if (nestedCause instanceof QueryFailedError) {
          return nestedCause;
        }
        const nestedResponse = (response as any).response;
        if (nestedResponse instanceof QueryFailedError) {
          return nestedResponse;
        }
      }
    }
    return null;
  }

  catch(exception: HttpException | QueryFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.BAD_REQUEST; // Default to 400 for client errors
    let message = 'A database error occurred';

    const queryFailedError = this.extractQueryFailedError(exception);
    if (queryFailedError) {
      if (
        queryFailedError.message.includes('violates foreign key constraint')
      ) {
        const detail = (queryFailedError as any).detail;
        if (detail) {
          // Parse the detail string: "Key (column)=(value) is not present in table \"table_name\"."
          const keyMatch = detail.match(
            /Key \(([^)]+)\)=\(([^)]+)\) is not present in table "([^"]+)"/,
          );
          if (keyMatch) {
            const [, column, value, table] = keyMatch;
            message = `Invalid ${column}: value ${value} does not exist in ${table}`;
          } else {
            message = detail; // Fallback to raw detail if pattern doesn’t match
          }
        } else {
          message = queryFailedError.message; // Fallback to raw message if no detail
        }
      } else {
        message = queryFailedError.message;
      }
    } else if (exception instanceof HttpException) {
      // If no QueryFailedError is found, use the HttpException's message
      message = exception.message;
      status = exception.getStatus();
    }

    response.status(status).json({
      status: 'ERROR',
      message,
      data: '',
      timestamp: new Date().toISOString(),
      path: ctx.getRequest().url,
    });
  }
}
