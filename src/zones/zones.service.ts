/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SearchQueryDto } from 'src/common/dtos';
import { IZone as IType, IUser } from 'src/common/interfaces';
import { IQuery } from 'src/common/types';
import { Zones as Entity } from 'src/models';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { CreateZoneDto as CreateDto, UpdateZoneDto as UpdateDto } from './dto';

@Injectable()
export class ZonesService {
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
      const {
        country,
        state,
        county,
        zone_type,
        manager_employee,
        parent_zone,
        ...rest
      } = data;
      const payload = {
        ...rest,
        country: country ? { id: country } : null,
        state: state ? { id: state } : null,
        county: county ? { id: county } : null,
        zone_type: zone_type ? { id: zone_type } : null,
        manager_employee: manager_employee ? { id: manager_employee } : null,
        parent_zone: parent_zone ? { id: parent_zone } : null,
        created_by: String(user.id),
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

      // Handle direct property filters
      if (filter.name) {
        where.name = ILike(`%${filter.name}%`);
      }
      if (filter.phone) {
        where.phone = ILike(`%${filter.phone}%`);
      }
      if (filter.email) {
        where.email = ILike(`%${filter.email}%`);
      }

      // Handle relation filters
      if (filter.country) {
        where.country = { id: filter.country };
      }
      if (filter.state) {
        where.state = { id: filter.state };
      }
      if (filter.county) {
        where.county = { id: filter.county };
      }
      if (filter.zone_type) {
        where.zone_type = { id: filter.zone_type };
      }
      if (filter.manager_employee) {
        where.manager_employee = { id: filter.manager_employee };
      }
      if (filter.parent_zone) {
        where.parent_zone = { id: filter.parent_zone };
      }

      const sort = (query.sort && JSON.parse(query.sort)) ?? {};
      const order = { ...sort };

      const res = await this.repository.find({
        where: where,
        relations: {
          country: true,
          state: true,
          county: true,
          zone_type: true,
          manager_employee: true,
          parent_zone: true,
          zone_area_by_zipcodes: true,
          zone_account_teams: true,
          zone_companies: true,
          zone_contacts: true,
          child_zones: true,
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
      const result = await this.repository.findOne({
        where: { id: id },
        relations: {
          country: true,
          state: true,
          county: true,
          zone_type: true,
          manager_employee: true,
          parent_zone: true,
          child_zones: true,
          zone_area_by_zipcodes: true,
          zone_account_teams: true,
          zone_companies: true,
          zone_contacts: true,
          app_users: true,
        },
      });

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
        country: data.hasOwnProperty('country')
          ? data.country ? { id: data.country } : null
          : record.country,
        state: data.hasOwnProperty('state')
          ? data.state ? { id: data.state } : null
          : record.state,
        county: data.hasOwnProperty('county')
          ? data.county ? { id: data.county } : null
          : record.county,
        zone_type: data.hasOwnProperty('zone_type')
          ? data.zone_type ? { id: data.zone_type } : null
          : record.zone_type,
        manager_employee: data.hasOwnProperty('manager_employee')
          ? data.manager_employee ? { id: data.manager_employee } : null
          : record.manager_employee,
        parent_zone: data.hasOwnProperty('parent_zone')
          ? data.parent_zone ? { id: data.parent_zone } : null
          : record.parent_zone,
        updated_by: String(user.id),
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
