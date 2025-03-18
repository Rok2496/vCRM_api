/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SearchQueryDto } from 'src/common/dtos';
import { IVoter as IType, IUser } from 'src/common/interfaces';
import { IQuery } from 'src/common/types';
import { Voters as Entity } from 'src/models';
import { DeleteResult, Repository } from 'typeorm';
import {
  CreateVotersDto as CreateDto,
  UpdateVotersDto as UpdateDto,
} from './dto';

@Injectable()
export class VotersService {
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
      const { contact, data_repo, ...rest } = data;

      const payload = {
        ...rest,
        contact: contact ? { id: contact } : null,
        data_repository: data_repo ? { id: data_repo } : null,
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
      const sort = (query.sort && JSON.parse(query.sort)) ?? {};

      const qb = this.repository.createQueryBuilder('voter');
      
      // Add relations
      qb.leftJoinAndSelect('voter.contact', 'contact')
        .leftJoinAndSelect('voter.data_repository', 'data_repository')
        .leftJoinAndSelect('voter.voter_tags', 'voter_tags');

      if (filter.zone_id) {
        qb.leftJoin('voter.voter_zones', 'voter_zone').andWhere(
          'voter_zone.zone_id = :zoneId',
          { zoneId: filter.zone_id },
        );
      }

      if (filter.master_tag_id || filter.master_tag_category_id) {
        qb.leftJoin('voter.voter_tags', 'voter_tag');
      }

      if (filter.master_tag_id) {
        qb.andWhere('voter_tag.master_tag_id = :masterTagId', {
          masterTagId: filter.master_tag_id,
        });
      }

      if (filter.master_tag_category_id) {
        qb.andWhere('voter_tag.master_tag_category_id = :masterTagCategoryId', {
          masterTagCategoryId: filter.master_tag_category_id,
        });
      }

      if (filter.search) {
        qb.andWhere(
          `(voter.first_name ILIKE :search OR 
            voter.middle_name ILIKE :search OR 
            voter.last_name ILIKE :search OR 
            voter.name_suffix ILIKE :search)`,
          { search: `%${filter.search}%` },
        );
      }

      Object.keys(sort).forEach((key) => {
        qb.addOrderBy(`voter.${key}`, sort[key].toUpperCase());
      });

      qb.take(query.limit || 10).skip(query.skip || 0);

      const res = await qb.getMany();

      const result: IQuery<IType> = { data: res };

      if (query.pagination) {
        const total = await qb.getCount();
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
          contact: true,
          data_repository: true,
          voter_tags: true
        }
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
        contact: data.hasOwnProperty('contact')
          ? data.contact ? { id: data.contact } : null
          : record.contact,
        data_repository: data.hasOwnProperty('data_repo')
          ? data.data_repo ? { id: data.data_repo } : null
          : record.data_repository,
        updated_by: user && String(user.id),
        updated_at: new Date(),
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
