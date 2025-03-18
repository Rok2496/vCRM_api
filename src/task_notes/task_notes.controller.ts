import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateTaskNotesDto, UpdateTaskNotesDto } from './dto';
import { TaskNotesService } from './task_notes.service';
import { Task_Notes } from '../models/task_notes.entity';

@ApiTags('Task Notes')
@Controller('task-notes')
export class TaskNotesController {
  constructor(private readonly taskNotesService: TaskNotesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new task note' })
  @ApiResponse({
    status: 201,
    description: 'The task note has been successfully created.',
    type: Task_Notes,
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  create(@Body() createTaskNotesDto: CreateTaskNotesDto, @Req() req) {
    return this.taskNotesService.create(createTaskNotesDto, req.user);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all task notes' })
  @ApiResponse({
    status: 200,
    description: 'List of all task notes.',
    type: [Task_Notes],
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  findAll(@Req() req) {
    return this.taskNotesService.findAll(req.user);
  }

  @Get('task/:taskId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all notes for a specific task' })
  @ApiResponse({
    status: 200,
    description: 'List of all notes for the specified task.',
    type: [Task_Notes],
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  findAllByTask(@Param('taskId') taskId: string, @Req() req) {
    return this.taskNotesService.findAllByTask(+taskId, req.user);
  }

  @Get('task-event/:taskEventId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all notes for a specific task event' })
  @ApiResponse({
    status: 200,
    description: 'List of all notes for the specified task event.',
    type: [Task_Notes],
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  findAllByTaskEvent(@Param('taskEventId') taskEventId: string, @Req() req) {
    return this.taskNotesService.findAllByTaskEvent(+taskEventId, req.user);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a task note by ID' })
  @ApiResponse({
    status: 200,
    description: 'The found task note.',
    type: Task_Notes,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Task note not found.' })
  findOne(@Param('id') id: string, @Req() req) {
    return this.taskNotesService.findOne(+id, req.user);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a task note' })
  @ApiResponse({
    status: 200,
    description: 'The task note has been successfully updated.',
    type: Task_Notes,
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Task note not found.' })
  update(
    @Param('id') id: string,
    @Body() updateTaskNotesDto: UpdateTaskNotesDto,
    @Req() req,
  ) {
    return this.taskNotesService.update(+id, updateTaskNotesDto, req.user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a task note' })
  @ApiResponse({
    status: 200,
    description: 'The task note has been successfully deleted.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Task note not found.' })
  remove(@Param('id') id: string, @Req() req) {
    return this.taskNotesService.remove(+id, req.user);
  }
} 