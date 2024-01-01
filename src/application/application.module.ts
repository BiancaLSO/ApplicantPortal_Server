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
import { StatusService } from 'src/status/status.service';

// import { ActivityModule } from '../activity/activity.module';
// import { GrantModule } from '../grant/grant.module';
// import { UserModule } from '../user/user.module';

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
    StatusService,
  ],
  controllers: [ApplicationController],
  exports: [ApplicationService],
})
export class ApplicationModule {}
