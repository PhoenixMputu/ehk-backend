import { Controller, Get, Query } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';

@Controller('cloudinary')
export class CloudinaryController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Get('upload')
  async uploadImage(@Query('email') imageUrl: string): Promise<any> {
    const result = await this.cloudinaryService.uploadImage(imageUrl);
    return result;
  }
}
