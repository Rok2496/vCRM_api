import {
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiHeader,
  ApiOperation,
} from '@nestjs/swagger';
import { memoryStorage } from 'multer';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FileUploadDTO } from '../files/dto/file-upload.dto';
import { FilesCloudinaryService } from './files-cloudinary.service';

@Controller('file-cloudinary')
export class FilesCloudinaryController {
  private CLOUDINARY_SERVICE_IMG_CLOUD_NAME =
    process.env.CLOUDINARY_SERVICE_IMG_CLOUD_NAME;
  constructor(private readonly service: FilesCloudinaryService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'File or Image Upload to cloudinary Bucket' })
  @ApiHeader({ name: 'Authorization', description: 'Bearer Token' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: FileUploadDTO })
  @UseGuards(JwtAuthGuard)
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
      fileFilter: (req, file, cb) => {
        // Log the incoming file type
        console.log('Received file type:', file.mimetype);

        // Define allowed mime types
        const allowedImageTypes = /^image\/(jpg|jpeg|png|gif|webp)$/;
        const allowedAudioTypes = /^audio\/(mpeg|mp3|wav|ogg)$/;
        const allowedVideoTypes = /^video\/(mp4|mpeg|quicktime|webm)$/;
        const allowedPdfType = 'application/pdf';

        // Check file type
        if (
          file.mimetype.match(allowedImageTypes) ||
          file.mimetype.match(allowedAudioTypes) ||
          file.mimetype.match(allowedVideoTypes) ||
          file.mimetype === allowedPdfType
        ) {
          return cb(null, true);
        }

        // If file type is not allowed
        cb(
          new Error(
            `Invalid file type (${file.mimetype}). Allowed types: images, audio, video, PDF`,
          ),
          false,
        );
      },
      limits: {
        fileSize: 50 * 1024 * 1024, // 50MB limit
      },
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    try {
      console.log('Uploading file:', {
        mimetype: file?.mimetype,
        size: file?.size,
      });

      if (!file) {
        throw new HttpException('No file uploaded', HttpStatus.BAD_REQUEST);
      }

      const result = await this.service.uploadToCloudinary(
        file,
        this.CLOUDINARY_SERVICE_IMG_CLOUD_NAME,
      );

      return {
        status: 'success',
        message: 'File uploaded successfully',
        data: result,
      };
    } catch (err) {
      console.error('Upload error:', err);
      throw new HttpException(
        err.message || 'Upload failed',
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
}
