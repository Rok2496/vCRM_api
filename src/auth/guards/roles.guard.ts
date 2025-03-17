import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return false;

    // const request = context.switchToHttp().getRequest();
    // const roles = this.reflector.get<string[]>('roles', context.getHandler());
    // const user: IApp_User = request?.user;

    // if (!user) return false;

    // let hasPermission = user.is_super_admin;

    // if (!roles) return hasPermission;

    // for (let index = 0; index < roles.length; index++) {
    //   const role = roles[index];
    //   switch (role) {
    //     case Roles.ADMIN:
    //       hasPermission = user.is_admin || hasPermission;
    //       break;
    //     default:
    //       break;
    //   }
    //   if (hasPermission) return true;
    // }
    // return hasPermission;
  }
}
