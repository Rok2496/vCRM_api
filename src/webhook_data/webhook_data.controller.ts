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
import { CreateWebhookDataDto, UpdateWebhookDataDto } from './dto';
import { WebhookDataService } from './webhook_data.service';
import { WebhookData } from '../models/webhook_data.entity';

@ApiTags('Webhook Data')
@Controller('webhook-data')
export class WebhookDataController {
  constructor(private readonly webhookDataService: WebhookDataService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new webhook data record' })
  @ApiResponse({
    status: 201,
    description: 'The webhook data record has been successfully created.',
    type: WebhookData,
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  create(@Body() createWebhookDataDto: CreateWebhookDataDto, @Req() req) {
    return this.webhookDataService.create(createWebhookDataDto, req.user);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all webhook data records' })
  @ApiResponse({
    status: 200,
    description: 'List of all webhook data records.',
    type: [WebhookData],
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  findAll(@Req() req) {
    return this.webhookDataService.findAll(req.user);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a webhook data record by ID' })
  @ApiResponse({
    status: 200,
    description: 'The found webhook data record.',
    type: WebhookData,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Webhook data record not found.' })
  findOne(@Param('id') id: string, @Req() req) {
    return this.webhookDataService.findOne(+id, req.user);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a webhook data record' })
  @ApiResponse({
    status: 200,
    description: 'The webhook data record has been successfully updated.',
    type: WebhookData,
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Webhook data record not found.' })
  update(
    @Param('id') id: string,
    @Body() updateWebhookDataDto: UpdateWebhookDataDto,
    @Req() req,
  ) {
    return this.webhookDataService.update(+id, updateWebhookDataDto, req.user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a webhook data record' })
  @ApiResponse({
    status: 200,
    description: 'The webhook data record has been successfully deleted.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Webhook data record not found.' })
  remove(@Param('id') id: string, @Req() req) {
    return this.webhookDataService.remove(+id, req.user);
  }
} 