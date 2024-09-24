import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  constructor(private configService: ConfigService) {
    cloudinary.config({
      cloud_name: this.configService.get('CLOUDINARY_CLOUD_NAME'),
      api_key: this.configService.get('CLOUDINARY_API_KEY'),
      api_secret: this.configService.get('CLOUDINARY_API_SECRET'),
    });
  }

  async uploadImage(file: string): Promise<any> {
    try {
      const result = await cloudinary.uploader.upload(file, {
        resource_type: 'image',
      });
      return result;
    } catch (error) {
      throw new Error(`Image upload failed: ${error.message}`);
    }
  }
}