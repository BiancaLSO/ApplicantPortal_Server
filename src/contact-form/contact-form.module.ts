import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ContactForm } from './contact-form.entity';
import { ContactFormService } from './contact-form.service';
import { ContactFormController } from './contact-form.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ContactForm])],
  providers: [ContactFormService],
  controllers: [ContactFormController],
  exports: [ContactFormService],
})
export class ContactFormModule {}
