import { Controller, Get } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';

@Controller('cloudinary')
export class CloudinaryController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Get('upload')
  async uploadImage(): Promise<any> {
    const imageUrl = 'https://cdn.pixabay.com/photo/2015/03/26/09/42/breakfast-690128_1280.jpg';
    const result = await this.cloudinaryService.uploadImage(imageUrl);
    return result;
  }
}
