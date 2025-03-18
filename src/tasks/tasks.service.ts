import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IApp_User } from 'src/common/interfaces/app_users.interface';
import { Repository } from 'typeorm';
import { CreateTasksDto, UpdateTasksDto } from './dto';
import { Tasks } from '../models/tasks.entity';

type IType = Tasks;

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Tasks)
    private readonly repository: Repository<Tasks>,
  ) {}

  /**
   * Create a new task
   * @param {CreateTasksDto} createTasksDto
   * @param {IApp_User} user
   * @returns {Promise<IType>}
   */
  async create(createTasksDto: CreateTasksDto, user: IApp_User): Promise<IType> {
    try {
      const result = await this.repository.save({
        ...createTasksDto,
        created_by: user.id,
      });

      return result;
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Find all tasks
   * @param {IApp_User} user
   * @returns {Promise<IType[]>}
   */
  async findAll(user: IApp_User): Promise<IType[]> {
    try {
      return await this.repository.find({
        relations: {
          master_task_status_type: true,
          employee: true,
          user: true,
        },
      });
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Find all tasks for a specific user
   * @param {number} userId
   * @param {IApp_User} user
   * @returns {Promise<IType[]>}
   */
  async findAllByUser(userId: number, user: IApp_User): Promise<IType[]> {
    try {
      return await this.repository.find({
        where: { user_id: userId },
        relations: {
          master_task_status_type: true,
          employee: true,
          user: true,
        },
      });
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Find all tasks for a specific employee
   * @param {number} employeeId
   * @param {IApp_User} user
   * @returns {Promise<IType[]>}
   */
  async findAllByEmployee(employeeId: number, user: IApp_User): Promise<IType[]> {
    try {
      return await this.repository.find({
        where: { employee_id: employeeId },
        relations: {
          master_task_status_type: true,
          employee: true,
          user: true,
        },
      });
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Find one task
   * @param {number} id
   * @param {IApp_User} user
   * @returns {Promise<IType>}
   */
  async findOne(id: number, user: IApp_User): Promise<IType> {
    try {
      const result = await this.repository.findOne({
        where: { id },
        relations: {
          master_task_status_type: true,
          employee: true,
          user: true,
          task_notes: true,
          task_documents: true,
          task_teams: true,
        },
      });

      if (!result) {
        throw new NotFoundException(`Task #${id} not found`);
      }

      return result;
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Update a task
   * @param {number} id
   * @param {UpdateTasksDto} updateTasksDto
   * @param {IApp_User} user
   * @returns {Promise<IType>}
   */
  async update(id: number, updateTasksDto: UpdateTasksDto, user: IApp_User): Promise<IType> {
    try {
      const result = await this.repository.findOne({ where: { id } });

      if (!result) {
        throw new NotFoundException(`Task #${id} not found`);
      }

      await this.repository.update(id, {
        ...updateTasksDto,
        updated_by: user.id,
      } as any);

      return await this.findOne(id, user);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Remove a task
   * @param {number} id
   * @param {IApp_User} user
   * @returns {Promise<void>}
   */
  async remove(id: number, user: IApp_User): Promise<void> {
    try {
      const result = await this.repository.findOne({ where: { id } });

      if (!result) {
        throw new NotFoundException(`Task #${id} not found`);
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