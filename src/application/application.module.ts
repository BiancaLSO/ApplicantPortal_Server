import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Application } from './entities/application.entity';
import { ApplicationService } from './application.service';
import { ApplicationController } from './application.controller';
import { GrantService } from 'src/grant/grant.service';
import { UserService } from 'src/user/user.service';
import { ActivityService } from 'src/activity/activity.service';
import { Activity } from 'src/activity/entites/activity.entity';
import { User } from 'src/user/entities/user.entity';
import { Grant } from 'src/grant/entities/grant.entity';
import { UserCredentials } from 'src/user/entities/user.credentials.entity';
import { Address } from 'src/address/entities/address.entity';
import { Status } from 'src/entities/status.entity';

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
  providers: [ApplicationService, GrantService, UserService, ActivityService],
  controllers: [ApplicationController],
  exports: [ApplicationService],
})
export class ApplicationModule {}
