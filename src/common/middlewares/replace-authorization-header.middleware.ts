import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class ReplaceAuthorizationHeaderFromCookie implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const excludeRoutes = ['/users/verification'];
    const excludeRoutesPassword = ['/users/reset/password'];
    if (
      excludeRoutes.includes(req.originalUrl) === false &&
      excludeRoutesPassword.includes(req.originalUrl) === false &&
      req.cookies &&
      req.cookies.authorization
    ) {
      req.headers.authorization = req.cookies.authorization;
    }
    next();
  }
}
