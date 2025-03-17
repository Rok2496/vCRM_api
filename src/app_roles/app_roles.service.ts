import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SearchQueryDto } from 'src/common/dtos';
import { IApp_Role as IType, IUser } from 'src/common/interfaces';
import { IQuery } from 'src/common/types';
import {
  App_Permissions,
  App_Role_permissions,
  App_Roles as Entity,
} from 'src/models';
import { DeleteResult, Equal, ILike, In, Repository } from 'typeorm';
import {
  CreateApplicationRolesDto as CreateDto,
  ManagePermissionsDto,
  UpdateApplicationRolesDto as UpdateDto,
} from './dto';

@Injectable()
export class ApplicationRolesService {
  /**
   * Constructor
   * @param {Repository<IType>} repository
   */
  constructor(
    @InjectRepository(Entity)
    private readonly repository: Repository<IType>,

    @InjectRepository(App_Permissions)
    private readonly permissionRepository: Repository<App_Permissions>,

    @InjectRepository(App_Role_permissions)
    private readonly rolePermissionRepository: Repository<App_Role_permissions>,
  ) {}

  /**
   * Record Creation
   * @param {IUser} user
   * @param {CreateDto} data
   * @returns {Promise<IType>}
   */
  async create(user: IUser, data: CreateDto): Promise<IType> {
    try {
      const payload = {
        ...data,
      };

      return await this.repository.save(payload);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Record Query
   * @param {IUser} user
   * @param {SearchQueryDto} query
   * @returns {Promise<IQuery<IType>>}
   */
  async findAll(user: IUser, query: SearchQueryDto): Promise<IQuery<IType>> {
    try {
      const filter = (query.filter && JSON.parse(query.filter)) ?? {};
      const where = { ...filter };

      if (filter.name) {
        where.name = ILike(`%${filter.name}%`);
      }

      const sort = (query.sort && JSON.parse(query.sort)) ?? {};
      const order = { ...sort };

      const res = await this.repository.find({
        where: where,
        take: query.limit || 10,
        skip: query.skip || 0,
        order: order,
      });

      const result: IQuery<IType> = { data: res };

      if (query.pagination) {
        const total = await this.repository.count({ where: where });
        result.pagination = { total, limit: query.limit, skip: query.skip };
      }

      return result;
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Record Count
   * @param {SearchQueryDto} query
   * @returns {Promise<number>}
   */
  async count(query: SearchQueryDto): Promise<number> {
    try {
      const filter = (query.filter && JSON.parse(query.filter)) ?? {};
      const where = { ...filter };

      return await this.repository.count({ where: where });
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Record Retrieve
   * @param {number} id
   * @param {IUser} user
   * @returns {Promise<IType>}
   */
  async findOne(id: number, user: IUser): Promise<IType> {
    try {
      const result = await this.repository.findOne({ where: { id: id } });

      if (!result) {
        throw new NotFoundException(`Record #${id} not found`);
      }

      return result;
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Record Update
   * @param {number} id
   * @param {IUser} user
   * @param {UpdateDto} data
   * @returns {Promise<IType>}
   */
  async update(id: number, user: IUser, data: UpdateDto): Promise<IType> {
    try {
      const record = await this.repository.findOne({ where: { id } });

      if (!record) {
        throw new NotFoundException('Record not found.');
      }

      const payload = {
        ...record,
        ...data,
      };

      return await this.repository.save(payload);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Record Delete
   * @param {number} id
   * @param {IUser} user
   * @returns {Promise<DeleteResult>}
   */
  async remove(id: number, user: IUser): Promise<DeleteResult> {
    try {
      return this.repository.delete({ id });
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  async managePermissionsByRoleId(
    id: number,
    user: IUser,
    data: ManagePermissionsDto,
  ): Promise<string> {
    try {
      const role = await this.repository.findOne({
        where: { id },
        relations: {
          app_role_permissions: {
            permission: true,
          },
        },
      });

      if (!role) {
        throw new NotFoundException(`Role with id ${id} not found.`);
      }

      // Convert current permissions into a Map for faster lookups
      const currentPermissionsMap = new Map(
        role.app_role_permissions.map((x) => [x.permission.name, x.id]),
      );

      // Convert input permissions to a Set for O(1) lookups
      const newPermissionsSet = new Set(data.permissions);

      // Find permissions to add
      const newItemsRequiredInsert = data.permissions.filter(
        (perm) => !currentPermissionsMap.has(perm),
      );

      // Find permissions to remove
      const oldItemsRequiredDelete = [...currentPermissionsMap.entries()]
        .filter(([perm]) => !newPermissionsSet.has(perm))
        .map(([, id]) => id);

      await this.repository.manager.transaction(async (manager) => {
        // Insert new permissions
        if (newItemsRequiredInsert.length > 0) {
          const newPermissions = await manager.find(App_Permissions, {
            where: { name: In(newItemsRequiredInsert) },
            select: ['id'],
          });

          const newRolePermissions = newPermissions.map((permission) => {
            return Object.assign(new App_Role_permissions(), {
              permission: { id: permission.id } as any,
              role: { id } as any,
            });
          });

          await manager.save(App_Role_permissions, newRolePermissions);
        }

        // Delete old permissions
        if (oldItemsRequiredDelete.length > 0) {
          await manager.delete(App_Role_permissions, {
            id: In(oldItemsRequiredDelete),
          });
        }
      });

      return 'Permissions updated successfully';
    } catch (err) {
      throw new HttpException(
        err.message || 'An error occurred',
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async permissionsCheckerByRoleId(
    id: number,
    user: IUser,
    query: SearchQueryDto,
  ): Promise<string[]> {
    try {
      const filter = (query.filter && JSON.parse(query.filter)) ?? {};

      const res = await this.rolePermissionRepository.find({
        where: {
          role: Equal(id),
          permission: {
            name: In(filter.permissions || []),
          },
        },
        relations: {
          permission: true,
        },
      });

      const result = res.map((x) => x.permission.name);

      return result;
    } catch (err) {
      throw new HttpException(
        err.message || 'An error occurred',
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
}
