import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { PdfDto } from './dto/pdf.dto';
import { ActivityService } from '../activity/activity.service';
import { PdfUploadService } from './pdf_upload.service';

@Controller('pdf')
export class PdfUploadController {
  constructor(
    private readonly activityService: ActivityService,
    private readonly pdfUploadService: PdfUploadService,
  ) {}

  @Post(':id')
  async create(@Param('id') id: string, @Req() req, @Body() body) {
    const pdfDto = new PdfDto(body.name, body.content);

    pdfDto.activity = await this.activityService.findOne(+id);

    return this.pdfUploadService.add_pdf(pdfDto);
  }

  @Get()
  findAll(@Request() req: any) {
    return this.pdfUploadService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pdfUploadService.findOne(+id);
  }

  @Delete(':id')
  remove_activity(@Param('id') id: string) {
    return this.pdfUploadService.remove_pdf(+id);
  }
}
