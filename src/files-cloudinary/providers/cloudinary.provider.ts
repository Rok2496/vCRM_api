import { Provider } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { MediaProvider } from 'src/common/constant';

export const CloudinaryProvider: Provider = {
  provide: MediaProvider.Cloudinary,
  useFactory: () => {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_SERVICE_IMG_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    return cloudinary;
  },
};
