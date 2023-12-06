import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserCredentials } from './entities/user.credentials.entity';
import { Address } from '../address/entities/address.entity';
import { Notification } from '../notification/entites/notification.entity';
import { ContactForm } from '../contact-form/entities/contact-form.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserCredentials, Address, ContactForm]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
