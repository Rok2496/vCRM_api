import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PermissionTitle } from 'src/common/constant';
import { SearchQueryDto } from 'src/common/dtos';
import { IApp_Permission as IType, IUser } from 'src/common/interfaces';
import { IQuery } from 'src/common/types';
import { App_Permissions as Entity } from 'src/models';
import { DeleteResult, In, Repository } from 'typeorm';
import {
  CreateApplicationPermissionsDto as CreateDto,
  UpdateApplicationPermissionsDto as UpdateDto,
} from './dto';

@Injectable()
export class ApplicationPermissionsService {
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

  /**
   * Create permissions for the database
   * @returns {Promise<string>}
   */
  async seed(): Promise<string> {
    const permissionTitles = Object.values(PermissionTitle);

    const existingPermissions = await this.repository.find({
      select: ['name'],
      where: {
        name: In(permissionTitles),
      },
    });

    const existingTitles = existingPermissions.map(
      (permission) => permission.name,
    );

    const newPermissions = permissionTitles
      .filter((name) => !existingTitles.includes(name))
      .map((name) => ({ name }));

    if (newPermissions.length > 0) {
      console.log(existingTitles);
      await this.repository.insert(newPermissions);
      return 'Added successful';
    }
    return 'Nothing to be adding';
  }
}
