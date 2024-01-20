import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Application } from './entities/application.entity';
import { ApplicationService } from './application.service';
import { ApplicationController } from './application.controller';
import { GrantService } from '../grant/grant.service';
import { UserService } from '../user/user.service';
import { ActivityService } from '../activity/activity.service';
import { Activity } from '../activity/entites/activity.entity';
import { User } from '../user/entities/user.entity';
import { Grant } from '../grant/entities/grant.entity';
import { UserCredentials } from '../user/entities/user.credentials.entity';
import { Address } from '../address/entities/address.entity';
import { Status } from '../status/entities/status.entity';
import { NotificationService } from '../notification/notification.service';
import { Notification } from '../notification/entites/notification.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Application,
      Grant,
      User,
      Activity,
      UserCredentials,
      Address,
      Status,
      Notification,
    ]),
    // ActivityModule,
    // GrantModule,
    // UserModule,
  ],
  providers: [
    ApplicationService,
    GrantService,
    UserService,
    ActivityService,
    NotificationService,
  ],
  controllers: [ApplicationController],
  exports: [ApplicationService],
})
export class ApplicationModule {}
