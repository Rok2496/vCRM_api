import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IApp_User } from 'src/common/interfaces/app_users.interface';
import { Repository } from 'typeorm';
import { CreateTaskNotesDto, UpdateTaskNotesDto } from './dto';
import { Task_Notes } from '../models/task_notes.entity';

type IType = Task_Notes;

@Injectable()
export class TaskNotesService {
  constructor(
    @InjectRepository(Task_Notes)
    private readonly repository: Repository<Task_Notes>,
  ) {}

  /**
   * Create a new task note
   * @param {CreateTaskNotesDto} createTaskNotesDto
   * @param {IApp_User} user
   * @returns {Promise<IType>}
   */
  async create(createTaskNotesDto: CreateTaskNotesDto, user: IApp_User): Promise<IType> {
    try {
      // Set the creator user ID if not provided
      if (!createTaskNotesDto.creator_user_id) {
        createTaskNotesDto.creator_user_id = user.id;
      }

      const result = await this.repository.save({
        ...createTaskNotesDto,
        created_by: user.id,
      });

      return result;
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Find all task notes
   * @param {IApp_User} user
   * @returns {Promise<IType[]>}
   */
  async findAll(user: IApp_User): Promise<IType[]> {
    try {
      return await this.repository.find({
        relations: {
          creator_user: true,
          task: true,
          task_event: true,
        },
      });
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Find all notes for a specific task
   * @param {number} taskId
   * @param {IApp_User} user
   * @returns {Promise<IType[]>}
   */
  async findAllByTask(taskId: number, user: IApp_User): Promise<IType[]> {
    try {
      return await this.repository.find({
        where: { task_id: taskId },
        relations: {
          creator_user: true,
          task: true,
          task_event: true,
        },
        order: {
          creation_time: 'DESC',
        },
      });
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Find all notes for a specific task event
   * @param {number} taskEventId
   * @param {IApp_User} user
   * @returns {Promise<IType[]>}
   */
  async findAllByTaskEvent(taskEventId: number, user: IApp_User): Promise<IType[]> {
    try {
      return await this.repository.find({
        where: { task_event_id: taskEventId },
        relations: {
          creator_user: true,
          task: true,
          task_event: true,
        },
        order: {
          creation_time: 'DESC',
        },
      });
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Find one task note
   * @param {number} id
   * @param {IApp_User} user
   * @returns {Promise<IType>}
   */
  async findOne(id: number, user: IApp_User): Promise<IType> {
    try {
      const result = await this.repository.findOne({
        where: { id },
        relations: {
          creator_user: true,
          task: true,
          task_event: true,
        },
      });

      if (!result) {
        throw new NotFoundException(`Task Note #${id} not found`);
      }

      return result;
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Update a task note
   * @param {number} id
   * @param {UpdateTaskNotesDto} updateTaskNotesDto
   * @param {IApp_User} user
   * @returns {Promise<IType>}
   */
  async update(id: number, updateTaskNotesDto: UpdateTaskNotesDto, user: IApp_User): Promise<IType> {
    try {
      const result = await this.repository.findOne({ where: { id } });

      if (!result) {
        throw new NotFoundException(`Task Note #${id} not found`);
      }

      await this.repository.update(id, {
        ...updateTaskNotesDto,
        updated_by: user.id,
      } as any);

      return await this.findOne(id, user);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Remove a task note
   * @param {number} id
   * @param {IApp_User} user
   * @returns {Promise<void>}
   */
  async remove(id: number, user: IApp_User): Promise<void> {
    try {
      const result = await this.repository.findOne({ where: { id } });

      if (!result) {
        throw new NotFoundException(`Task Note #${id} not found`);
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