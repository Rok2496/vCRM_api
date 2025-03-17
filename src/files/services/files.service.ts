import { Injectable, Logger } from '@nestjs/common';
import { MediaProvider } from 'src/common/constant';
import { FilesCloudinaryService } from '../../files-cloudinary/files-cloudinary.service';
import { ProviderDTO } from '../dto/provider.dto';
import { AwsS3Service, LocalStorageService } from '../services';
import { DOSpaceService } from './do-space.service';

@Injectable()
export class FilesService {
  private readonly logger = new Logger(FilesService.name);

  /**
   * Constructor
   * @param {service<DOSpaceService>} doSpacesService
   * @param {service<AwsS3Service>} awsS3Service
   * @param {service<LocalStorageService>} localStorageService
   * @param {service<FilesCloudinaryService>} cloudinaryService
   */
  constructor(
    private readonly doSpacesService: DOSpaceService,
    private readonly awsS3Service: AwsS3Service,
    private readonly localStorageService: LocalStorageService,
    private readonly cloudinaryService: FilesCloudinaryService,
  ) {}

  /**
   * Upload File
   * @param {Express.Multer.File} file
   * @param {ProviderDTO} providerDto
   * @returns {Promise<Object>}
   */
  async upload(file: Express.Multer.File, providerDto?: ProviderDTO) {
    const PROVIDER = providerDto?.provider || process.env.FILE_SPACE_PROVIDER;
    this.logger.log(PROVIDER + ' Provider');
    const AWS_BUCKET_FOLDER = process.env.AWS_S3_BUCKET_FOLDER;
    const CLOUDINARY_SERVICE_IMG_CLOUD_NAME =
      process.env.CLOUDINARY_SERVICE_IMG_CLOUD_NAME;

    const response = {
      Location: '',
      provider: PROVIDER,
    };

    switch (PROVIDER) {
      case MediaProvider.DO_SPACE:
        const doLocation = await this.doSpacesService.uploadToDOSpace(
          file,
          AWS_BUCKET_FOLDER,
        );
        response.Location = doLocation.Location;
        return response;
      case MediaProvider.AWS_S3:
        const awsLocation = await this.awsS3Service.uploadToS3(
          file,
          AWS_BUCKET_FOLDER,
        );
        response.Location = awsLocation.Location;
        return response;
      case MediaProvider.Cloudinary:
        const cloudinaryLocation: any =
          await this.cloudinaryService.uploadToCloudinary(
            file,
            CLOUDINARY_SERVICE_IMG_CLOUD_NAME,
          );
        response.Location = cloudinaryLocation.url;
        return response;
      case MediaProvider.LOCAL:
        const publicKey = (await this.localStorageService.upload(file))
          .publicKey;
        const localLocation = process.env.BE_HOST + '/file/local/' + publicKey;
        response.Location = localLocation;
        this.logger.log('Path: ' + localLocation);
        return response;
    }
  }
}
