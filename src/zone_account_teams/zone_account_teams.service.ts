import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IApp_User } from 'src/common/interfaces/app_users.interface';
import { Repository } from 'typeorm';
import { CreateZoneAccountTeamsDto, UpdateZoneAccountTeamsDto } from './dto';
import { Zone_Account_Teams } from '../models/zone_account_teams.entity';

type IType = Zone_Account_Teams;

@Injectable()
export class ZoneAccountTeamsService {
  constructor(
    @InjectRepository(Zone_Account_Teams)
    private readonly repository: Repository<Zone_Account_Teams>,
  ) {}

  /**
   * Create a new record
   * @param {CreateZoneAccountTeamsDto} createZoneAccountTeamsDto
   * @param {IApp_User} user
   * @returns {Promise<IType>}
   */
  async create(createZoneAccountTeamsDto: CreateZoneAccountTeamsDto, user: IApp_User): Promise<IType> {
    try {
      const result = await this.repository.save({
        ...createZoneAccountTeamsDto,
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
          user: true,
          employee: true,
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
          user: true,
          employee: true,
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
   * @param {UpdateZoneAccountTeamsDto} updateZoneAccountTeamsDto
   * @param {IApp_User} user
   * @returns {Promise<IType>}
   */
  async update(id: number, updateZoneAccountTeamsDto: UpdateZoneAccountTeamsDto, user: IApp_User): Promise<IType> {
    try {
      const result = await this.repository.findOne({ where: { id } });

      if (!result) {
        throw new NotFoundException(`Record #${id} not found`);
      }

      await this.repository.update(id, {
        ...updateZoneAccountTeamsDto,
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