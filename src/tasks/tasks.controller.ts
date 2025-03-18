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
import { CreateTasksDto, UpdateTasksDto } from './dto';
import { TasksService } from './tasks.service';
import { Tasks } from '../models/tasks.entity';

@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new task or event' })
  @ApiResponse({
    status: 201,
    description: 'The task or event has been successfully created.',
    type: Tasks,
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  create(@Body() createTasksDto: CreateTasksDto, @Req() req) {
    return this.tasksService.create(createTasksDto, req.user);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all tasks and events' })
  @ApiResponse({
    status: 200,
    description: 'List of all tasks and events.',
    type: [Tasks],
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  findAll(@Req() req) {
    return this.tasksService.findAll(req.user);
  }

  @Get('user/:userId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all tasks assigned to a specific user' })
  @ApiResponse({
    status: 200,
    description: 'List of all tasks assigned to the specified user.',
    type: [Tasks],
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  findAllByUser(@Param('userId') userId: string, @Req() req) {
    return this.tasksService.findAllByUser(+userId, req.user);
  }

  @Get('employee/:employeeId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all tasks assigned to a specific employee' })
  @ApiResponse({
    status: 200,
    description: 'List of all tasks assigned to the specified employee.',
    type: [Tasks],
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  findAllByEmployee(@Param('employeeId') employeeId: string, @Req() req) {
    return this.tasksService.findAllByEmployee(+employeeId, req.user);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a task by ID' })
  @ApiResponse({
    status: 200,
    description: 'The found task.',
    type: Tasks,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Task not found.' })
  findOne(@Param('id') id: string, @Req() req) {
    return this.tasksService.findOne(+id, req.user);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a task' })
  @ApiResponse({
    status: 200,
    description: 'The task has been successfully updated.',
    type: Tasks,
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Task not found.' })
  update(
    @Param('id') id: string,
    @Body() updateTasksDto: UpdateTasksDto,
    @Req() req,
  ) {
    return this.tasksService.update(+id, updateTasksDto, req.user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a task' })
  @ApiResponse({
    status: 200,
    description: 'The task has been successfully deleted.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Task not found.' })
  remove(@Param('id') id: string, @Req() req) {
    return this.tasksService.remove(+id, req.user);
  }
} 