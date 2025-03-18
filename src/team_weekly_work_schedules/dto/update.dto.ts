import { PartialType } from '@nestjs/swagger';
import { CreateTeamWeeklyWorkSchedulesDto } from './create.dto';

export class UpdateTeamWeeklyWorkSchedulesDto extends PartialType(CreateTeamWeeklyWorkSchedulesDto) {} 