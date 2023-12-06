import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { Notification } from './entites/notification.entity';
import { User } from 'src/user/entities/user.entity';
import { Address } from 'src/address/entities/address.entity';
import { Application } from 'src/application/entities/application.entity';
import { ContactForm } from 'src/contact-form/entities/contact-form.entity';
import { PDF } from 'src/pdf_upload/entities/pdf_upload.entity';
import { UserService } from 'src/user/user.service';
import { UserController } from 'src/user/user.controller';
import { UserCredentials } from 'src/user/entities/user.credentials.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Notification,
      User,
      Address,
      Application,
      ContactForm,
      PDF,
      UserCredentials,
    ]),
  ],
  controllers: [NotificationController],
  providers: [NotificationService, UserService],
})
export class NotificationModule {}
