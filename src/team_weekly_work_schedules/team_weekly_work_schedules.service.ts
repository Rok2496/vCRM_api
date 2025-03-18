import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IApp_User } from 'src/common/interfaces/app_users.interface';
import { Repository } from 'typeorm';
import { CreateTeamWeeklyWorkSchedulesDto, UpdateTeamWeeklyWorkSchedulesDto } from './dto';
import { Team_Weekly_Work_Schedules } from '../models/team_weekly_work_schedules.entity';

type IType = Team_Weekly_Work_Schedules;

@Injectable()
export class TeamWeeklyWorkSchedulesService {
  constructor(
    @InjectRepository(Team_Weekly_Work_Schedules)
    private readonly repository: Repository<Team_Weekly_Work_Schedules>,
  ) {}

  /**
   * Create a new record
   * @param {CreateTeamWeeklyWorkSchedulesDto} createTeamWeeklyWorkSchedulesDto
   * @param {IApp_User} user
   * @returns {Promise<IType>}
   */
  async create(createTeamWeeklyWorkSchedulesDto: CreateTeamWeeklyWorkSchedulesDto, user: IApp_User): Promise<IType> {
    try {
      const result = await this.repository.save({
        ...createTeamWeeklyWorkSchedulesDto,
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
          employee: true,
        },
      });
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Find all schedules for a specific employee
   * @param {number} employeeId
   * @param {IApp_User} user
   * @returns {Promise<IType[]>}
   */
  async findAllByEmployee(employeeId: number, user: IApp_User): Promise<IType[]> {
    try {
      return await this.repository.find({
        where: { employee_id: employeeId },
        relations: {
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
   * @param {UpdateTeamWeeklyWorkSchedulesDto} updateTeamWeeklyWorkSchedulesDto
   * @param {IApp_User} user
   * @returns {Promise<IType>}
   */
  async update(id: number, updateTeamWeeklyWorkSchedulesDto: UpdateTeamWeeklyWorkSchedulesDto, user: IApp_User): Promise<IType> {
    try {
      const result = await this.repository.findOne({ where: { id } });

      if (!result) {
        throw new NotFoundException(`Record #${id} not found`);
      }

      await this.repository.update(id, {
        ...updateTeamWeeklyWorkSchedulesDto,
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