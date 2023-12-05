import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';

import { ContactForm } from './entities/contact-form.entity';
import { ContactFormService } from './contact-form.service';
import { ContactFormDto } from './dto/contact-form.dto';
import { UserService } from 'src/user/user.service';

@Controller('contact-form')
export class ContactFormController {
  constructor(
    private readonly contactFormService: ContactFormService,
    private readonly userService: UserService,
  ) {}

  @Post()
  async create(@Body() body): Promise<ContactForm> {
    const user = await this.userService.findOne(body.userId);
    const contactFormDto = new ContactFormDto();
    contactFormDto.description = body.description;
    contactFormDto.user = user;
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
