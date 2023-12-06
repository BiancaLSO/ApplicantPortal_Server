import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ContactForm } from './entities/contact-form.entity';
import { ContactFormService } from './contact-form.service';
import { ContactFormController } from './contact-form.controller';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { Address } from '../address/entities/address.entity';
import { UserCredentials } from '../user/entities/user.credentials.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ContactForm, User, Address, UserCredentials]),
  ],
  providers: [ContactFormService, UserService],
  controllers: [ContactFormController],
  exports: [ContactFormService],
})
export class ContactFormModule {}
