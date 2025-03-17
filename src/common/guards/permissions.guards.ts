import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { EntityManager } from 'typeorm';
import { HasPermissions } from '../decorators';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly entityManager: EntityManager,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const { user } = context.switchToHttp().getRequest();

      if (user.is_super_admin) return true;

      const userId = user.id;

      const permissions = this.reflector.get(
        HasPermissions,
        context.getHandler(),
      );

      const result = await this.entityManager.query(
        `
        SELECT 
          CASE 
            WHEN EXISTS (
              SELECT 1
              FROM public.app_permissions ap
              INNER JOIN public.app_role_permissions arp ON arp.permission_id = ap.id
              INNER JOIN public.app_user_roles aur ON aur.role_id = arp.role_id
              WHERE aur.user_id = $1 AND ap.name = ANY($2::text[])
              LIMIT 1
            ) THEN true
            WHEN EXISTS (
              SELECT 1
              FROM public.app_permissions ap
              INNER JOIN public.app_user_custom_permissions aucp ON aucp.permission_id = ap.id
              INNER JOIN public.app_user_roles aur ON aur.user_id = aucp.user_id
              WHERE aur.user_id = $1 AND ap.name = ANY($2::text[])
              LIMIT 1
            ) THEN true
            ELSE false
          END AS "hasPermission";
        `,
        [userId, permissions],
      );

      const hasPermission = result[0].hasPermission;

      return !!hasPermission;
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }
}
