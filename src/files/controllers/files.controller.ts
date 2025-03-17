import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiHeader,
  ApiOperation,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { ValidationPipe } from '../../common/pipes/validation.pipe';
import { FileUploadDTO } from '../dto/file-upload.dto';
import { ProviderDTO } from '../dto/provider.dto';
import { FilesService } from '../services/files.service';

@Controller('file')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'File or Image Upload Dynamic Bucket' })
  @ApiHeader({ name: 'Authorization', description: 'Bearer Token' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: FileUploadDTO })
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe(true))
  @UseInterceptors(FileInterceptor('file'))
  @Post('upload')
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Body() providerDto?: ProviderDTO,
  ) {
    try {
      return await this.filesService.upload(file, providerDto);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }
}
