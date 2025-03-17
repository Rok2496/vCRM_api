import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SearchQueryDto } from 'src/common/dtos';
import { IApp_Role_Permission as IType, IUser } from 'src/common/interfaces';
import { IQuery } from 'src/common/types';
import { App_Role_permissions as Entity } from 'src/models';
import { DeleteResult, Equal, Repository } from 'typeorm';
import {
  CreateApplicationRolePermissionsDto as CreateDto,
  UpdateApplicationRolePermissionsDto as UpdateDto,
} from './dto';

@Injectable()
export class ApplicationRolePermissionsService {
  /**
   * Constructor
   * @param {Repository<IType>} repository
   */
  constructor(
    @InjectRepository(Entity)
    private readonly repository: Repository<IType>,
  ) {}

  /**
   * Record Creation
   * @param {IUser} user
   * @param {CreateDto} data
   * @returns {Promise<IType>}
   */
  async create(user: IUser, data: CreateDto): Promise<IType> {
    try {
      const { permission, role, ...rest } = data;
      const payload = {
        ...rest,
        permission: { id: permission },
        role: { id: role },
      };

      const newRecord = this.repository.create(payload);
      return await this.repository.save(newRecord);
    } catch (err) {
      throw new HttpException(
        err.message || 'Bad Request',
        HttpStatus.BAD_REQUEST,
      );
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

      if (filter.role) {
        where.role = Equal(filter.role);
      }

      const sort = (query.sort && JSON.parse(query.sort)) ?? {};
      const order = { ...sort };

      const res = await this.repository.find({
        where: where,
        relations: {
          permission: true,
        },
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

      const appRole = data.hasOwnProperty('role')
        ? { id: data.role }
        : record.role;

      const appPermission = data.hasOwnProperty('permission')
        ? { id: data.permission }
        : record.permission;

      const payload = {
        ...record,
        ...data,
        permission: appPermission,
        role: appRole,
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
}
