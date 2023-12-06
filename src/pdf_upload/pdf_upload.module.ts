import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Activity } from '../activity/entites/activity.entity';
import { PDF } from './entities/pdf_upload.entity';
import { PdfUploadService } from './pdf_upload.service';
import { PdfUploadController } from './pdf_upload.controller';
import { ActivityService } from '../activity/activity.service';
import { Status } from '../status/entities/status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Activity, PDF, Status])],
  controllers: [PdfUploadController],
  providers: [ActivityService, PdfUploadService],
})
export class PdfUploadModule {}
