import { Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from './cloudinary.service';
import { Express } from 'express';
import multer from 'multer';

@Controller('cloudinary')
export class CloudinaryController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', { storage: multer.memoryStorage() }))
  async uploadImage(@UploadedFile() file: Express.Multer.File): Promise<any> {
    if (!file) {
      throw new Error('No file provided');
    }

    const result = await this.cloudinaryService.uploadImage(file);
    return result;
  }
}
