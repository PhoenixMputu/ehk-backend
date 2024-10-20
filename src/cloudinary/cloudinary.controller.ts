import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from './cloudinary.service';
import { Express } from 'express';
import * as multer from 'multer';

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

  @Post('upload-multiple')
  @UseInterceptors(
    FilesInterceptor('files', 10, { storage: multer.memoryStorage() }),
  )
  async uploadMultipleImages(
    @UploadedFiles() files: Express.Multer.File[],
  ): Promise<any> {
    if (!files || files.length === 0) {
      throw new BadRequestException('No files provided');
    }

    const uploadPromises = files.map((file) =>
      this.cloudinaryService.uploadImage(file),
    );
    const results = await Promise.all(uploadPromises);
    return results;
  }
}
