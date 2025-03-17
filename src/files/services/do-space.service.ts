import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { DoSpacesServiceLib } from '../helper/do-space.helper';

@Injectable()
export class DOSpaceService {
  private DO_SPACE_BUCKET = process.env.DO_SPACE;
  constructor(@Inject(DoSpacesServiceLib) private readonly s3: AWS.S3) {}

  /**
   * Upload File
   * @param {Express.Multer.File} file
   * @returns {Promise<Object>}
   */
  async uploadToDOSpace(file: Express.Multer.File, bucketFolder: string) {
    const doAccessKey = process.env.DO_ACCESS_KEY_ID;
    const doSecretKey = process.env.DO_SECRET_ACCESS_KEY;
    const spacesEndpoint = new AWS.Endpoint(process.env.DO_SPACES_ENDPOINT);
    const s3 = new AWS.S3({
      endpoint: spacesEndpoint,
      accessKeyId: doAccessKey,
      secretAccessKey: doSecretKey,
    });
    const Bucket = this.DO_SPACE_BUCKET + '/' + bucketFolder;
    const { buffer, originalname, mimetype } = file;
    const fileName = `${Date.now()}-${originalname}`;

    const params = {
      Bucket: Bucket,
      Key: String(fileName),
      ContentType: mimetype || 'image/jpeg',
      Body: buffer,
      ACL: 'public-read',
    };
    try {
      return await s3.upload(params).promise();
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }
}
