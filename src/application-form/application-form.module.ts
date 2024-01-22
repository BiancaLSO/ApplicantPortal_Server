import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationForm } from './entities/application-form.entity';
import { ApplicationFormService } from './application-form.service';
import { ApplicationFormController } from './application-form.controller';
import { ApplicationService } from '../application/application.service';
import { Application } from '../application/entities/application.entity';
import { Activity } from '../activity/entites/activity.entity';
import { User } from '../user/entities/user.entity';
import { UserCredentials } from '../user/entities/user.credentials.entity';
import { ActivityService } from '../activity/activity.service';
import { UserService } from '../user/user.service';
import { GrantService } from '../grant/grant.service';
import { Grant } from '../grant/entities/grant.entity';
import { Address } from '../address/entities/address.entity';
import { Status } from '../status/entities/status.entity';
import { NotificationService } from '../notification/notification.service';
import { Notification } from '../notification/entites/notification.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ApplicationForm,
      Application,
      Activity,
      User,
      UserCredentials,
      Grant,
      Address,
      Status,
      Notification,
    ]),
  ],
  providers: [
    ApplicationFormService,
    ApplicationService,
    ActivityService,
    UserService,
    GrantService,
    NotificationService,
  ],
  controllers: [ApplicationFormController],
  exports: [ApplicationFormService],
})
export class ApplicationFormModule {}
