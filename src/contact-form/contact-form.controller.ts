import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';

import { ContactForm } from './contact-form.entity';
import { ContactFormService } from './contact-form.service';
import { ContactFormDto } from './contact-form.dto';

@Controller('contact-form')
export class ContactFormController {
  constructor(private readonly contactFormService: ContactFormService) {}

  @Post()
  create(@Body() contactFormDto: ContactFormDto): Promise<ContactForm> {
    return this.contactFormService.create(contactFormDto);
  }

  @Get()
  findAll(): Promise<ContactForm[]> {
    return this.contactFormService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: number): Promise<ContactForm> {
    return this.contactFormService.findById(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateContactFormDto: ContactFormDto,
  ): Promise<ContactForm> {
    return this.contactFormService.update(+id, updateContactFormDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.contactFormService.remove(+id);
  }
}
