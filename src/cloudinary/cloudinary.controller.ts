import { Controller, Get } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';

@Controller('cloudinary')
export class CloudinaryController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Get('upload')
  async uploadImage(): Promise<any> {
    const imageUrl =
      'https://res.cloudinary.com/dywvbuuqw/image/upload/v1716557822/Vodacom/fqz6skllf0him7wcfwvj.png';
    const result = await this.cloudinaryService.uploadImage(imageUrl);
    return result;
  }
}
