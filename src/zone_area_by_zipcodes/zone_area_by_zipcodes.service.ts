import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IApp_User } from 'src/common/interfaces/app_users.interface';
import { Repository } from 'typeorm';
import { CreateZoneAreaByZipcodesDto, UpdateZoneAreaByZipcodesDto } from './dto';
import { Zone_Area_By_Zipcodes } from '../models/zone_area_by_zipcodes.entity';

type IType = Zone_Area_By_Zipcodes;

@Injectable()
export class ZoneAreaByZipcodesService {
  constructor(
    @InjectRepository(Zone_Area_By_Zipcodes)
    private readonly repository: Repository<Zone_Area_By_Zipcodes>,
  ) {}

  /**
   * Create a new record
   * @param {CreateZoneAreaByZipcodesDto} createZoneAreaByZipcodesDto
   * @param {IApp_User} user
   * @returns {Promise<IType>}
   */
  async create(createZoneAreaByZipcodesDto: CreateZoneAreaByZipcodesDto, user: IApp_User): Promise<IType> {
    try {
      const result = await this.repository.save({
        ...createZoneAreaByZipcodesDto,
        created_by: user.id,
      });

      return result;
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Find all records
   * @param {IApp_User} user
   * @returns {Promise<IType[]>}
   */
  async findAll(user: IApp_User): Promise<IType[]> {
    try {
      return await this.repository.find({
        relations: {
          zone: true,
        },
      });
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Find one record
   * @param {number} id
   * @param {IApp_User} user
   * @returns {Promise<IType>}
   */
  async findOne(id: number, user: IApp_User): Promise<IType> {
    try {
      const result = await this.repository.findOne({
        where: { id },
        relations: {
          zone: true,
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
   * Update a record
   * @param {number} id
   * @param {UpdateZoneAreaByZipcodesDto} updateZoneAreaByZipcodesDto
   * @param {IApp_User} user
   * @returns {Promise<IType>}
   */
  async update(id: number, updateZoneAreaByZipcodesDto: UpdateZoneAreaByZipcodesDto, user: IApp_User): Promise<IType> {
    try {
      const result = await this.repository.findOne({ where: { id } });

      if (!result) {
        throw new NotFoundException(`Record #${id} not found`);
      }

      await this.repository.update(id, {
        ...updateZoneAreaByZipcodesDto,
        updated_by: user.id,
      } as any);

      return await this.findOne(id, user);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Remove a record
   * @param {number} id
   * @param {IApp_User} user
   * @returns {Promise<void>}
   */
  async remove(id: number, user: IApp_User): Promise<void> {
    try {
      const result = await this.repository.findOne({ where: { id } });

      if (!result) {
        throw new NotFoundException(`Record #${id} not found`);
      }

      await this.repository.update(id, {
        deleted_by: user.id,
        deleted_at: new Date(),
      } as any);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }
} 