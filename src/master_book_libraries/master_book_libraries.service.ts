import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SearchQueryDto } from 'src/common/dtos';
import { IMaster_Book_Library, IUser } from 'src/common/interfaces';
import { Master_Book_Libraries } from 'src/models';
import { Repository } from 'typeorm';
import { CreateMasterBookLibraryDto, UpdateMasterBookLibraryDto } from './dto';

@Injectable()
export class MasterBookLibrariesService {
  /**
   * Constructor
   * @param {Repository<Master_Book_Libraries>} repository
   */
  constructor(
    @InjectRepository(Master_Book_Libraries)
    private readonly repository: Repository<IMaster_Book_Library>,
  ) {}

  /**
   * Create record
   * @param {IUser} user
   * @param {CreateMasterBookLibraryDto} data
   * @returns {Promise<IBrand>}
   */
  public async create(data: CreateMasterBookLibraryDto, user?: IUser) {
    try {
      const { digital_library, ...others } = data;
      const payload = {
        ...others,
        digital_library: { id: digital_library },
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
   * @param {UpdateMasterBookLibraryDto} data
   * @returns {Promise<Master_Audio_Libraries>}
   */
  async update(
    id: number,
    data: UpdateMasterBookLibraryDto,
    user: IUser,
  ): Promise<IMaster_Book_Library> {
    try {
      const record = await this.repository.findOne({
        where: {
          id: id,
        },
      });
      if (!record) {
        throw new NotFoundException('Record not found.');
      }

      const { digital_library, ...others } = data;

      const payload = {
        ...record,
        ...others,
      };

      if (digital_library) {
        // payload.digital_library = { id: digital_library };
      }

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
