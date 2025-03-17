import { Reflector } from '@nestjs/core';
import { PermissionTitle } from '../constant';

export const HasPermissions = Reflector.createDecorator<PermissionTitle[]>();
