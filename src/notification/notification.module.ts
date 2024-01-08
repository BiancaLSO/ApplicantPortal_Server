import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { Notification } from './entites/notification.entity';
import { User } from '../user/entities/user.entity';
import { Address } from '../address/entities/address.entity';
import { Application } from '../application/entities/application.entity';
import { ContactForm } from '../contact-form/entities/contact-form.entity';
import { PDF } from '../pdf_upload/entities/pdf_upload.entity';
import { UserService } from '../user/user.service';
import { UserController } from '../user/user.controller';
import { UserCredentials } from '../user/entities/user.credentials.entity';

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
