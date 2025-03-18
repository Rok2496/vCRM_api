import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IApp_User } from 'src/common/interfaces/app_users.interface';
import { Repository } from 'typeorm';
import { CreateZoneContactsDto, UpdateZoneContactsDto } from './dto';
import { Zone_Contacts } from '../models/zone_contacts.entity';

type IType = Zone_Contacts;

@Injectable()
export class ZoneContactsService {
  constructor(
    @InjectRepository(Zone_Contacts)
    private readonly repository: Repository<Zone_Contacts>,
  ) {}

  /**
   * Create a new record
   * @param {CreateZoneContactsDto} createZoneContactsDto
   * @param {IApp_User} user
   * @returns {Promise<IType>}
   */
  async create(createZoneContactsDto: CreateZoneContactsDto, user: IApp_User): Promise<IType> {
    try {
      const result = await this.repository.save({
        ...createZoneContactsDto,
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
          contact: true,
          data_repository: true,
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
          contact: true,
          data_repository: true,
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
   * @param {UpdateZoneContactsDto} updateZoneContactsDto
   * @param {IApp_User} user
   * @returns {Promise<IType>}
   */
  async update(id: number, updateZoneContactsDto: UpdateZoneContactsDto, user: IApp_User): Promise<IType> {
    try {
      const result = await this.repository.findOne({ where: { id } });

      if (!result) {
        throw new NotFoundException(`Record #${id} not found`);
      }

      await this.repository.update(id, {
        ...updateZoneContactsDto,
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