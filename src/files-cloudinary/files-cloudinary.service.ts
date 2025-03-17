import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { MediaProvider } from 'src/common/constant';

@Injectable()
export class FilesCloudinaryService {
  constructor(@Inject(MediaProvider.Cloudinary) private cloudinary) {}

  /**
   * Upload File
   * @param {Express.Multer.File} file
   * @param {string} folder
   * @returns {Promise<Object>}
   */
  async uploadToCloudinary(file: Express.Multer.File, folder: string) {
    try {
      if (!file) {
        throw new Error('No file provided');
      }

      if (!file.buffer) {
        throw new Error('File buffer is missing');
      }

      // Determine resource type based on mimetype
      let resourceType = 'auto';
      if (file.mimetype.startsWith('image/')) {
        resourceType = 'image';
      } else if (file.mimetype.startsWith('video/')) {
        resourceType = 'video';
      } else if (file.mimetype.startsWith('audio/')) {
        resourceType = 'video'; // Cloudinary handles audio under video type
      }

      return new Promise((resolve, reject) => {
        const uploadStream = this.cloudinary.uploader.upload_stream(
          {
            folder: folder,
            resource_type: resourceType,
            // Additional options for video/audio
            ...(resourceType === 'video' && {
              chunk_size: 60000000, // 60MB chunks for video
              eager: [
                { format: 'mp4', quality: 'auto' },
                { format: 'webm', quality: 'auto' },
              ],
              eager_async: true,
            }),
          },
          (error, result) => {
            if (error) {
              console.error('Cloudinary upload error:', error);
              reject(error);
              return;
            }
            resolve({
              message: 'File uploaded successfully',
              data: {
                url: result.secure_url,
                public_id: result.public_id,
                resource_type: result.resource_type,
                format: result.format,
                ...(result.duration && { duration: result.duration }),
              },
            });
          },
        );

        // Handle stream errors
        uploadStream.on('error', (error) => {
          console.error('Stream error:', error);
          reject(error);
        });

        // Write buffer to stream
        uploadStream.write(file.buffer);
        uploadStream.end();
      });
    } catch (error) {
      console.error('Service error:', error);
      throw new HttpException(
        error.message,
        error.http_code || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async uploadBase64ToCloudinary(imageBase64: string, folder: string) {
    try {
      const result = await this.cloudinary.uploader.upload(imageBase64, {
        folder: folder,
        resource_type: 'image',
      });
      return result;
    } catch (err) {
      throw new HttpException(
        err.message,
        err.http_code || HttpStatus.BAD_REQUEST,
      );
    }
  }
}
