import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PDF } from '../entities/pdf_upload.entity';
import { PdfDto } from './dto/pdf.dto';

@Injectable()
export class PdfUploadService {
  constructor(
    @InjectRepository(PDF)
    private pdfRepository: Repository<PDF>,
  ) {}

  add_pdf(pdfDto: PdfDto) {
    return this.pdfRepository.save(pdfDto);
  }
  findAll() {
    return this.pdfRepository.find({ relations: ['attachments'] });
  }

  findOne(id: number) {
    return this.pdfRepository.findOne({
      where: { id: id },
      relations: ['attachments'],
    });
  }

  remove_pdf(id: number) {
    return this.pdfRepository.delete(id);
  }
}
