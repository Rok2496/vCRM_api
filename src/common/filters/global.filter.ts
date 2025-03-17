import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
    Logger,
} from '@nestjs/common';
import { SentryExceptionCaptured } from '@sentry/nestjs';
import * as Sentry from '@sentry/node';
import { Request, Response } from 'express';

@Catch()
export class CatchAllExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(CatchAllExceptionFilter.name);

    @SentryExceptionCaptured()
    catch(exception: unknown, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        // Determine if the error is a HTTP exception
        const status =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        // Get error message
        const message =
            exception instanceof HttpException
                ? exception.message
                : 'Internal server error';

        // Get detailed error info if available
        const error =
            exception instanceof HttpException
                ? exception.getResponse()
                : {
                    message,
                    error: exception instanceof Error ? exception.message : 'Unknown error',
                    stack: exception instanceof Error ? exception.stack : undefined
                };

        // Enhanced Sentry reporting
        if (status >= 500) {
            Sentry.withScope((scope) => {
                scope.setExtras({
                    path: request.url,
                    timestamp: new Date().toISOString(),
                    method: request.method,
                    body: request.body,
                    query: request.query,
                    params: request.params,
                    headers: request.headers,
                    status,
                });

                if (request.user) {
                    scope.setUser({
                        id: request.user['id'],
                        email: request.user['email'],
                    });
                }

                Sentry.captureException(exception);
            });
        }

        // Log the error using NestJS Logger
        this.logger.error(`Exception caught: ${message}`, {
            path: request.url,
            timestamp: new Date().toISOString(),
            error: error,
            stack: exception instanceof Error ? exception.stack : undefined,
            status,
            method: request.method,
        });

        // Send response to client
        response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            message: message,
            error: process.env.NODE_ENV === 'production'
                ? undefined
                : error
        });
    }
}