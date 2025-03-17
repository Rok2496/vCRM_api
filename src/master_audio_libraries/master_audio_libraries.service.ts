import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SearchQueryDto } from 'src/common/dtos';
import { IUser } from 'src/common/interfaces';
import { Master_Audio_Libraries } from 'src/models';
import { Repository } from 'typeorm';
import {
  CreateMasterAudioLibraryDto,
  UpdateMasterAudioLibraryDto,
} from './dto';

@Injectable()
export class MasterAudioLibrariesService {
  /**
   * Constructor
   * @param {Repository<Master_Audio_Libraries>} repository
   */
  constructor(
    @InjectRepository(Master_Audio_Libraries)
    private readonly repository: Repository<Master_Audio_Libraries>,
  ) {}

  /**
   * Create record
   * @param {IUser} user
   * @param {CreateMasterAudioLibraryDto} data
   * @returns {Promise<IBrand>}
   */
  public async create(data: CreateMasterAudioLibraryDto, user?: IUser) {
    try {
      const payload = {
        ...data,
      };
      return await this.repository.save(payload);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  public async findAll(query: SearchQueryDto) {
    try {
      const filter = (query.filter && JSON.parse(query.filter)) ?? {};
      const where = {
        ...filter,
      };

      const sort = (query.sort && JSON.parse(query.sort)) ?? {};
      const order = {
        ...sort,
      };

      const res = await this.repository.find({
        where: where,
        take: query.limit || 10,
        skip: query.skip || 0,
        order: order,
      });

      const result: any = {
        data: res,
      };

      if (query.pagination) {
        const total = await this.repository.count({
          where: where,
        });
        result.pagination = {
          total,
          limit: query.limit,
          skip: query.skip,
        };
      }

      return result;
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: number) {
    try {
      const record = await this.repository.findOne({
        where: {
          id: id,
        },
      });

      if (!record) {
        throw new NotFoundException(`Record #${id} not found`);
      }

      return record;
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Edit record
   * @param {IUser} user
   * @param {number} id
   * @param {UpdateMasterAudioLibraryDto} data
   * @returns {Promise<Master_Audio_Libraries>}
   */
  async update(
    id: number,
    data: UpdateMasterAudioLibraryDto,
    user: IUser,
  ): Promise<Master_Audio_Libraries> {
    try {
      const record = await this.repository.findOne({
        where: {
          id: id,
        },
      });
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
   * Count records
   * @returns {Promise<IBrands>}
   */
  public async count(query: SearchQueryDto): Promise<number> {
    try {
      const filter = (query.filter && JSON.parse(query.filter)) ?? {};
      const where = {
        ...filter,
      };

      return await this.repository.count({
        where: where,
      });
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Record Delete
   * @param {number} id
   */
  public async remove(id: number) {
    try {
      return this.repository.delete({
        id,
      });
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }
}
