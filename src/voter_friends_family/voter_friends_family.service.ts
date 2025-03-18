import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IApp_User } from 'src/common/interfaces/app_users.interface';
import { Repository } from 'typeorm';
import { CreateVoterFriendsFamilyDto, UpdateVoterFriendsFamilyDto } from './dto';
import { Voter_Friends_Family } from '../models/voter_friends_family.entity';

type IType = Voter_Friends_Family;

@Injectable()
export class VoterFriendsFamilyService {
  constructor(
    @InjectRepository(Voter_Friends_Family)
    private readonly repository: Repository<Voter_Friends_Family>,
  ) {}

  /**
   * Create a new record
   * @param {CreateVoterFriendsFamilyDto} createVoterFriendsFamilyDto
   * @param {IApp_User} user
   * @returns {Promise<IType>}
   */
  async create(createVoterFriendsFamilyDto: CreateVoterFriendsFamilyDto, user: IApp_User): Promise<IType> {
    try {
      const result = await this.repository.save({
        ...createVoterFriendsFamilyDto,
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
          primary_voter: true,
          related_voter: true,
        },
      });
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Find all relationships for a specific voter
   * @param {number} voterId
   * @param {IApp_User} user
   * @returns {Promise<IType[]>}
   */
  async findAllByVoter(voterId: number, user: IApp_User): Promise<IType[]> {
    try {
      return await this.repository.find({
        where: [
          { primary_voter_id: voterId },
          { related_voter_id: voterId },
        ],
        relations: {
          primary_voter: true,
          related_voter: true,
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
          primary_voter: true,
          related_voter: true,
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
   * @param {UpdateVoterFriendsFamilyDto} updateVoterFriendsFamilyDto
   * @param {IApp_User} user
   * @returns {Promise<IType>}
   */
  async update(id: number, updateVoterFriendsFamilyDto: UpdateVoterFriendsFamilyDto, user: IApp_User): Promise<IType> {
    try {
      const result = await this.repository.findOne({ where: { id } });

      if (!result) {
        throw new NotFoundException(`Record #${id} not found`);
      }

      await this.repository.update(id, {
        ...updateVoterFriendsFamilyDto,
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