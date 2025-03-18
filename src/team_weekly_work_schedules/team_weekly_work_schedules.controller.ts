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
import { CreateTeamWeeklyWorkSchedulesDto, UpdateTeamWeeklyWorkSchedulesDto } from './dto';
import { TeamWeeklyWorkSchedulesService } from './team_weekly_work_schedules.service';
import { Team_Weekly_Work_Schedules } from '../models/team_weekly_work_schedules.entity';

@ApiTags('Team Weekly Work Schedules')
@Controller('team-weekly-work-schedules')
export class TeamWeeklyWorkSchedulesController {
  constructor(private readonly teamWeeklyWorkSchedulesService: TeamWeeklyWorkSchedulesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new team weekly work schedule' })
  @ApiResponse({
    status: 201,
    description: 'The team weekly work schedule has been successfully created.',
    type: Team_Weekly_Work_Schedules,
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  create(@Body() createTeamWeeklyWorkSchedulesDto: CreateTeamWeeklyWorkSchedulesDto, @Req() req) {
    return this.teamWeeklyWorkSchedulesService.create(createTeamWeeklyWorkSchedulesDto, req.user);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all team weekly work schedules' })
  @ApiResponse({
    status: 200,
    description: 'List of all team weekly work schedules.',
    type: [Team_Weekly_Work_Schedules],
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  findAll(@Req() req) {
    return this.teamWeeklyWorkSchedulesService.findAll(req.user);
  }

  @Get('employee/:employeeId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all schedules for a specific employee' })
  @ApiResponse({
    status: 200,
    description: 'List of all schedules for the specified employee.',
    type: [Team_Weekly_Work_Schedules],
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  findAllByEmployee(@Param('employeeId') employeeId: string, @Req() req) {
    return this.teamWeeklyWorkSchedulesService.findAllByEmployee(+employeeId, req.user);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a team weekly work schedule by ID' })
  @ApiResponse({
    status: 200,
    description: 'The found team weekly work schedule.',
    type: Team_Weekly_Work_Schedules,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Team weekly work schedule not found.' })
  findOne(@Param('id') id: string, @Req() req) {
    return this.teamWeeklyWorkSchedulesService.findOne(+id, req.user);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a team weekly work schedule' })
  @ApiResponse({
    status: 200,
    description: 'The team weekly work schedule has been successfully updated.',
    type: Team_Weekly_Work_Schedules,
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Team weekly work schedule not found.' })
  update(
    @Param('id') id: string,
    @Body() updateTeamWeeklyWorkSchedulesDto: UpdateTeamWeeklyWorkSchedulesDto,
    @Req() req,
  ) {
    return this.teamWeeklyWorkSchedulesService.update(+id, updateTeamWeeklyWorkSchedulesDto, req.user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a team weekly work schedule' })
  @ApiResponse({
    status: 200,
    description: 'The team weekly work schedule has been successfully deleted.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Team weekly work schedule not found.' })
  remove(@Param('id') id: string, @Req() req) {
    return this.teamWeeklyWorkSchedulesService.remove(+id, req.user);
  }
}